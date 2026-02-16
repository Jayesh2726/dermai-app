import json
import numpy as np
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Load documents
with open("data/allData.json", "r", encoding="utf-8") as f:
    documents = json.load(f)

def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

async def retrieve(query, top_k=3):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )

    query_embedding = response.data[0].embedding

    scored = []

    for doc in documents:
        score = cosine_similarity(query_embedding, doc["embedding"])
        scored.append({**doc, "score": score})

    scored.sort(key=lambda x: x["score"], reverse=True)

    return scored[:top_k]
