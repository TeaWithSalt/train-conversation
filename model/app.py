from flask import Flask, request, jsonify
from pyannote.audio import Pipeline
from pyannote_whisper.utils import diarize_text
import whisper
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
import os
import librosa
import soundfile
from os import path
from pydub import AudioSegment
import noisereduce as nr
from rnnoise_wrapper import RNNoise
from pydub.silence import split_on_silence


UPLOAD_FOLDER = 'uploads'
app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.0", use_auth_token="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")
model = whisper.load_model("large")
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Audio to Text API"
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)



def trimAudio(save_path):
   # w, s = librosa.load(save_path)
    #w = librosa.effects.trim(w, top_db=25)[0]


    #soundfile.write(save_path, w, s)


    audio2 = AudioSegment.from_wav(save_path)
    chunks = split_on_silence(audio2, min_silence_len=650, silence_thresh=-60)
    output = AudioSegment.empty()
    for chunk in chunks:
        output += chunk


    save_path = os.path.join(app.config['UPLOAD_FOLDER'], "filename.wav")
    output.export(save_path, format="wav")





    return save_path



@app.route('/audio-to-text', methods=['POST'])
@cross_origin()
def audioToText():
    audio_file = request.files['audio']
    print(audio_file)
    filename = secure_filename(audio_file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    audio_file.save(save_path)

    s = trimAudio(save_path)

    asr_result = model.transcribe(s, language="russian")
    diarization_result = pipeline(s, num_speakers=2)
   # os.remove(save_path)
    final_result = diarize_text(asr_result, diarization_result)


    str = {}
    str["all"] = []
    str["dialogue"] = []
    str["notDefine"] = []
    for seg, spk, sent in final_result:
        line = f'{seg.start:.2f} {seg.end:.2f} {spk} {sent}'
        line1 = f'{spk}: {sent}'
        if spk is None:
            str["notDefine"].append(line)
            continue
        if spk not in str:
            str[spk] = [line]
        else:
            str[spk].append(line)
        str["all"].append(line)
        str["dialogue"].append(line1)

    return jsonify(str)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001)

