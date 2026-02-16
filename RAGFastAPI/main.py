from fastapi import FastAPI
from pydantic import BaseModel
from retriever import retrieve
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
@app.get("/")
def home():
    return {"message": "RAG API is running 🚀"}
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class QueryRequest(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(request: QueryRequest):
    docs = await retrieve(request.question)

    context = "\n\n".join([doc["content"] for doc in docs])

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a medical assistant. Answer only using provided context."
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion:\n{request.question}"
            }
        ]
    )

    return {
        "answer": response.choices[0].message.content,
        "sources": [doc["id"] for doc in docs]
    }
