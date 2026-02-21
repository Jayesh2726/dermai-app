from fastapi import FastAPI, File, UploadFile
from flask import app
from predict import predict

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Model API is running 🚀"}

@app.post("/predict")
async def model_predict(file: UploadFile = File(...)):
    contents = await file.read()
    result = predict(contents)
    return {"prediction": result}