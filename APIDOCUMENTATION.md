# 🧠 AI Disease Detection & RAG API Documentation

---

## 📌 Overview

This project provides two production-ready APIs built using FastAPI and deployed on cloud platforms:

1. **Monkeypox Disease Detection API** – Image-based prediction using a trained deep learning model.
2. **RAG (Retrieval-Augmented Generation) Question Answering API** – Context-aware question answering using vector search + LLM.

---

# 🌍 1️⃣ Monkeypox Disease Detection API

### 🔗 Base URL
```
https://monkeypox-disease-detection-production.up.railway.app
```

### 📘 Interactive API Docs (Swagger)
```
https://monkeypox-disease-detection-production.up.railway.app/docs
```

---

## 🔍 Endpoint: Predict Disease

### POST `/predict`

### 📥 Request Type
`multipart/form-data`

### 📤 Request Parameters

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| file | Image File (JPG/PNG) | ✅ | Skin lesion image for prediction |

---

### 📌 Example Request (cURL)

```bash
curl -X POST \
  "https://monkeypox-disease-detection-production.up.railway.app/predict" \
  -F "file=@image.jpg"
```

---

### ✅ Successful Response

```json
{
  "predicted_class": "Monkeypox",
  "confidence": 0.94
}
```

---

### ⚠️ Error Responses

| Status Code | Description |
|------------|-------------|
| 400 | Invalid image format |
| 422 | Validation error |
| 500 | Internal server error |

---

# 📚 2️⃣ RAG Question Answering API

### 🔗 Base URL
```
https://rag-app-kvjf.onrender.com
```

### 📘 Interactive API Docs (Swagger)
```
https://rag-app-kvjf.onrender.com/docs
```

---

## 🔍 Endpoint: Ask Question

### POST `/ask`

### 📥 Request Type
`application/json`

### 📤 Request Body

```json
{
  "question": "What are the symptoms of monkeypox?"
}
```

---

### 📌 Example Request (cURL)

```bash
curl -X POST \
  "https://rag-app-kvjf.onrender.com/ask" \
  -H "Content-Type: application/json" \
  -d '{"question":"What are the symptoms of monkeypox?"}'
```

---

### ✅ Successful Response

```json
{
  "answer": "Monkeypox symptoms include fever, rash, swollen lymph nodes..."
}
```

---

### ⚠️ Error Responses

| Status Code | Description |
|------------|-------------|
| 400 | Invalid request body |
| 404 | Endpoint not found |
| 500 | Internal server error |

---

# 🏗 Architecture Summary

## Disease Detection Flow

1. User uploads image
2. Image preprocessing
3. CNN model inference
4. Softmax probability calculation
5. JSON response returned

## RAG Flow

1. User submits question
2. Relevant documents retrieved via vector search
3. Context passed to LLM
4. Generated answer returned as JSON

---

# 🔐 Authentication (Future Enhancement)

Currently, APIs are public.

Recommended future implementation:

```
Authorization: Bearer <API_KEY>
```

---

# 📈 Recommended Production Improvements

- API versioning (`/api/v1/`)
- Rate limiting
- Request logging & monitoring
- API key authentication
- Streaming response support for RAG
- Docker container optimization

---

# 👨‍💻 Maintainer

**Jayesh Magare**  
AI Engineer | Data Analyst | Full-Stack Developer

---

## 📬 Support

For issues, feature requests, or integration support, please open a GitHub issue or contact the maintainer.

---

**Version:** 1.0.0  
**Last Updated:** 2026

