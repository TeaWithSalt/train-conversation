from flask import Flask, request, jsonify
from pyannote.audio import Pipeline
from pyannote_whisper.utils import diarize_text
import whisper
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
from pydub import AudioSegment
from pydub.silence import detect_nonsilent
import os

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


def remove_silence(audio_path, filename, min_silence_len=1000, silence_thresh=-40):
    audio = AudioSegment.from_file(audio_path)
    nonsilent_parts = detect_nonsilent(
        audio,
        min_silence_len=min_silence_len,
        silence_thresh=silence_thresh
    )

    if not nonsilent_parts:
        return audio

    start = nonsilent_parts[0][0]
    end = nonsilent_parts[-1][1]
    trimmed_audio = audio[start:end]

    processed_save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'd_' + filename)
    trimmed_audio.export(processed_save_path, format="mp3")



@app.route('/audio-to-text', methods=['POST'])
@cross_origin()
def audioToText():
    audio_file = request.files['audio']
    filename = secure_filename(audio_file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    audio_file.save(save_path)

    #remove_silence(audio_file, filename)

    #p = os.path.join(app.config['UPLOAD_FOLDER'], 'd_' + filename)
    asr_result = model.transcribe(save_path, language="russian")
    diarization_result = pipeline(save_path, num_speakers=2)
    #os.remove(save_path)
    #os.remove(p)
    final_result = diarize_text(asr_result, diarization_result)


    str = {}
    str["all"] = []
    str["notDefine"] = []
    for seg, spk, sent in final_result:
        line = f'{seg.start:.2f} {seg.end:.2f} {spk} {sent}'
        if spk is None:
            str["notDefine"].append(line)
            continue
        if spk not in str:
            str[spk] = [line]
        else:
            str[spk].append(line)
        str["all"].append(line)

    print(final_result)
    print(str)

    return jsonify(str)


if __name__ == '__main__':
    app.run()
