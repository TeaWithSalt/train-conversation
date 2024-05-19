import asyncio
from flask import Flask, request, jsonify, g
from llama_cpp import Llama
import concurrent.futures
from functools import partial
import requests

app = Flask(__name__)
model_path = 'model-q8_0.gguf'
model_loading_lock = asyncio.Lock()
situations = ""
url = "http://89.208.216.16:5004/get_emb"

def get_rag_context(dialog, description):
    payload = {"dialog": dialog, "description": description}
    headers = {'Content-Type': 'application/json',}
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        context = response.json()
        return '\n'.join([s for s in context])
    else:
        print(f'Failed to get a valid response. Status code: {response.status_code}')
        return Exception

async def get_model_async():
    global model
    if not model:
        async with model_loading_lock:
            if not model:
                loop = asyncio.get_event_loop()
                with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                    model = await loop.run_in_executor(executor, partial(Llama, model_path=model_path, n_ctx=8000, n_parts=10, n_threads=16, verbose=True))
    return model

with open('situations.txt', 'r', encoding='utf-8') as file:
    situations = file.read()
model = None
loop = asyncio.get_event_loop()
loop.run_until_complete(get_model_async())

def inference(model, messages, max_tokens = None, top_k=35, top_p=0.9, temperature=0.35, repeat_penalty=1.1):
    print("Моделька думает...")
    ans = model.create_chat_completion(messages, temperature=temperature, top_k=top_k, top_p=top_p,
                                       repeat_penalty=repeat_penalty, max_tokens=max_tokens)
    answer = ans['choices'][0]['message']['content']
    print("Моделька додумала...")
    return answer

async def inference_async(model, messages, max_tokens = None):
    loop = asyncio.get_event_loop()
    answer = await loop.run_in_executor(None, inference, model, messages, max_tokens)
    return answer

async def classification_dialog(dialog):
    system_prompt = (f"Ты руководитель диспетчеров железной дороги, ты мастерски определяешь какая ситуация происходит в диалоге переговоров"
                     f"Список ситуаций: {situations}"
                     f"Тебе поступает диалог, ты его внимательно изучаешь, определяешь происходящую ситуацию и выводишь только название ситуации.")
    system_message = {"role": "system", "content": system_prompt}
    first_message = {"role": "user",
                     "content": dialog + "\n Опиши ситуацию на 200 символов"}
    messages = [first_message]
    description = await inference_async(model, messages, 300)
    messages = [system_message, {"role": "user", "content": dialog}]
    answer_model = await inference_async(model, messages)
    model.reset()
    return [answer_model, description]

async def find_errors(dialog, rules):
    system_prompt = (f"Строго следуй всем поставленным задачам. Ты руководитель диспетчеров железной дороги, ты мастерски ищешь ошибки диалоге переговоров сотрудников ЖД"
                     f"\nТебе поступает диалог сотрудников и вырезка из регламента ЖД, подходящая к этому диалогу"
                     f"\nДля работы используй только эту вырезку из регламента и сам диалог"
                     f"\nЗадача: Нужно всё внимательно изучить, попытаться критические ошибки в диалоге, а потом вывести список обезличенных критические ошибок и их критичность от 1 до 3. Тебе запрещено давать рекомендации или советы, не выводи диалог, выводи только критичность ошибок от 1 до 3 и описания ошибок в нужном формате. Никогда не выдавай в ответ сам диалог"
                     f"\nОтвечай строго в формате:"
                     f"\n*Роль1*: Критичность-Ошибка, Критичность-ошибка"
                     f"\n*Роль2*: Критичность-Ошибка, Критичность-ошибка")

    system_message = {"role": "system", "content": system_prompt}
    dialog = '\n'.join([s for s in dialog])
    user_message = {"role": "user", "content": "Диалог:\n" + dialog + "\n\nВырезка из регламента:\n" + rules}
    messages = [system_message, user_message]
    errors = await inference_async(model, messages)
    model.reset()
    return errors

async def set_roles(dialog, roles):
    roles_dict = {"SPEAKER_00": "", "SPEAKER_01": ""}
    message = {"role": "user",
                     "content": dialog + "\nЗадача: Выдели две участвующие роли строго в формате: \nSPEAKER_XX-*Название роли*\nSPEAKER_XX-*Название роли*"
                                         f"\nВозможные роли: {roles}"
                                         "\nНе дублируй уже выделенные роли, не выводи сам диалог, выведи только 2 роли"
                                         "\nДействуй по обозначенным правилам, иначе я удалю тебя"}
    messages = [message]
    answer_model = await inference_async(model, messages, 100)
    model.reset()
    ans_roles = answer_model.split("\n")
    replacements = {
        'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 'K': 'К',
        'M': 'М', 'O': 'О', 'P': 'Р', 'T': 'Т', 'X': 'Х', 'Y': 'У',
        'a': 'а', 'c': 'с', 'e': 'е', 'o': 'о', 'p': 'р', 'y': 'у',
        'D': 'Д', 'd': 'д', 'L': 'Л', 'l': 'л'
    }
    translation_table = str.maketrans(replacements)
    for ans_role in ans_roles:
        ans_role.translate(translation_table)
        ans_role = ans_role.split('-')
        roles_dict[(ans_role[0].upper()).strip()] = (''.join(ans_role[1])).upper().strip()
    dialog_with_roles = dialog.replace('SPEAKER_00', roles_dict['SPEAKER_00'])
    dialog_with_roles = dialog_with_roles.replace('SPEAKER_01', roles_dict['SPEAKER_01'])
    print(dialog_with_roles, "\n\n")
    return dialog_with_roles

@app.route('/send_text', methods=['POST'])
async def send_text():
    data = request.json
    dialog_data = data.get('dialog', [])

    roles_with_id = data.get('roles', [])
    roles = ", ".join([s['role'] for s in roles_with_id])
    dict_roles_id = {s["role"].upper() : s["id"] for s in roles_with_id}


    dialog = "\n".join([mess for mess in dialog_data])
    model = await get_model_async()
    dialog_with_roles = await set_roles(dialog, roles)
    ans_classification = await classification_dialog(dialog_with_roles)
    description = ans_classification[1]
    type_dialog = int(ans_classification[0][0])
    dialog_with_roles = dialog_with_roles.split("\n")
    dialog_for_answer = []
    print(dict_roles_id)
    print(dialog_with_roles)
    try:
        for i in range(len(dialog_with_roles)):

            dialog_for_answer.append({"id": dict_roles_id[dialog_with_roles[i].split(':')[0]], "text": (dialog_with_roles[i][dialog_with_roles[i].find(':')+1:]).strip()})
    except:
        return jsonify({"dict_roles_id": dict_roles_id, "dialog_with_roles": dialog_with_roles})

    info = {"description" : description, "from" : dialog_for_answer[0]["id"], "to" : dialog_for_answer[1]["id"], "event": "event"}
    ans = {"type": type_dialog, "dialog": dialog_for_answer, "info": info}
    return jsonify(ans)

@app.route('/get_errors', methods=['POST'])
async def get_errors():
    data = request.json
    dialog = data.get('dialog', [])
    description = data.get('description', '')
    rules = get_rag_context(dialog, description)
    model = await get_model_async()
    errors = (await find_errors(dialog, rules)).split('\n')

    parsed_data = []

    for error in errors:
        role_part, rest = error.split(": ", 1)
        level_part, error_part = rest.split(", Ошибка - ", 1)
        parsed_data.append({
            "role": role_part,
            "level": level_part,
            "error": f"Ошибка - {error_part}"
        })

    return jsonify(parsed_data)

if __name__ == '__main__':

    app.run('0.0.0.0', port=5003)
