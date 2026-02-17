from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from retriever import retrieve
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "RAG API is running 🚀"}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class QueryRequest(BaseModel):
    question: str
    disease: Optional[str] = None       # ← New optional field
    confidence: Optional[float] = None  # ← New optional field


@app.post("/ask")
async def ask_question(request: QueryRequest):
    docs = await retrieve(request.question)
    context = "\n\n".join([doc["content"] for doc in docs])

    # Build system prompt dynamically based on whether prediction exists
    if request.disease and request.confidence is not None:
        confidence_pct = round(request.confidence * 100, 1)

        low_confidence_warning = ""
        if confidence_pct < 70:
            low_confidence_warning = f"\n⚠️ IMPORTANT: The confidence is LOW ({confidence_pct}%). Clearly tell the user this may NOT be accurate and they must consult a doctor."

        system_prompt = f"""You are DermAI, an AI-powered dermatology assistant.
The user has recently analyzed a skin image.

Analysis Result:
- Predicted Disease: {request.disease}
- Confidence Score: {confidence_pct}%{low_confidence_warning}

Your job:
1. Clearly explain what {request.disease} means in simple terms.
2. Explain how serious it may be.
3. Mention common symptoms of {request.disease}.
4. Suggest basic precautions or next steps the user should take.
5. If confidence is below 70%, warn the user this may not be accurate.
6. Always remind the user this is AI-based assistance and NOT a medical diagnosis.
7. Keep the explanation simple, warm, and patient-friendly.
8. Use the provided context to support your answer.
9. Format your response with clear bullet points."""

    else:
        system_prompt = """You are DermAI, an AI-powered dermatology assistant.
Answer the user's question about skin diseases using the provided context.
Keep responses simple, clear, and patient-friendly.
Use bullet points for readability.
Always remind users that your responses are educational and not a substitute for professional medical advice."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion:\n{request.question}"
            }
        ],
        temperature=0.7,
        max_tokens=800
    )

    return {
        "answer": response.choices[0].message.content,
        "sources": [doc["id"] for doc in docs]
    }