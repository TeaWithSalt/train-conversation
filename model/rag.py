import json
import numpy as np
import faiss
from transformers import AutoTokenizer, AutoModel
import torch
from flask import Flask, request, jsonify, g

app = Flask(__name__)
# Загрузка токенизатора и модели
tokenizer = AutoTokenizer.from_pretrained("intfloat/multilingual-e5-large")
model = AutoModel.from_pretrained("intfloat/multilingual-e5-large")

texts = []
with open('tables.json', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    texts.append(item['text'])

def embed_documents(documents, model, tokenizer):
    inputs = tokenizer(documents, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        embeddings = model(**inputs).last_hidden_state.mean(dim=1)
    return embeddings

document_embeddings = embed_documents(texts, model, tokenizer)
index = faiss.IndexFlatL2(document_embeddings.shape[1])
index.add(document_embeddings.numpy())

def retrieve_documents(query, index, model, tokenizer, texts, top_k=2):
    query_embedding = embed_documents([query], model, tokenizer).numpy()
    distances, indices = index.search(query_embedding, top_k)
    return [texts[i] for i in indices[0]]


@app.route('/get_emb', methods=['POST'])
async def get_emb():
    data = request.json
    dialog_data = data.get('dialog', [])
    description_data = data.get('description', [])
    text = " ".join([s for s in dialog_data]) + ' ' + description_data

    print(text)

    results = retrieve_documents(text, index, model, tokenizer, texts)
    results.append('Четкость и краткость: Сообщения должны быть предельно ясными и содержать только необходимую информацию. Лишние слова, такие как "здравствуйте", "спасибо", "пожалуйста", "хорошо", не используются.')
    results.append('Структура и последовательность: Информация передается в строго установленной последовательности и формате. Например, передача команды, подтверждение её получения, выполнение и доклад о выполнении.')
    results.append('Опознавание и идентификация: Все участники переговоров должны идентифицировать себя и указывать свой позывной или номер, а также позывной или номер адресата.')
    results.append('Фиксация и подтверждение: Каждое полученное сообщение должно быть подтверждено кратким ответом, указывающим на его получение и понимание. Например, "Принял" или "Выполняю".')
    results.append('Использование специальных терминов и фраз: Используются только установленные термины и фразы, обеспечивающие однозначное понимание. Например, "Поезд готов", "Начинаю движение", "Стоянка".')
    results.append('Отсутствие эмоций и личных замечаний: Разговоры ведутся строго по делу, без эмоциональных вкраплений и личных замечаний.')
    return jsonify(results)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5004)
