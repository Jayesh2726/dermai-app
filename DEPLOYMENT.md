# 🚀 Deployment Guide

This document explains how to deploy the following services:

1. 🧠 Monkeypox Disease Detection API (FastAPI)
2. 📚 RAG Question Answering API (FastAPI)

Both services are deployed independently for scalability.

---

# 🏗 Project Architecture

- Backend Framework: FastAPI
- Deployment Platforms:
  - Railway (Disease Detection API)
  - Render (RAG API)
- Optional: Docker-based deployment

---

# 🖥 Local Development Setup

## 1️⃣ Prerequisites

- Python 3.9+
- pip installed
- virtualenv (recommended)

---

## 2️⃣ Setup Backend (FastAPI)

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 3️⃣ Run Locally

```bash
uvicorn main:app --reload --port 8000
```

Open in browser:

```
http://localhost:8000/docs
```

---

# 🚄 Deploy to Railway (Disease Detection API)

## Step 1: Prepare Project

Ensure you have:
- requirements.txt
- main.py (FastAPI entry point)
- Procfile (optional but recommended)

Example Procfile:

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Step 2: Deploy on Railway

1. Push code to GitHub
2. Go to Railway Dashboard
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Select your repository

---

## Step 3: Configure Settings

- Build Command:

```
pip install -r requirements.txt
```

- Start Command:

```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Step 4: Environment Variables

Add in Railway dashboard:

```
PORT=8000
OPENAI_API_KEY=your_key_if_used
```

---

## Production URL Example

```
https://monkeypox-disease-detection-production.up.railway.app
```

---

# 🌐 Deploy to Render (RAG API)

## Step 1: Push Code to GitHub

Ensure repository contains:
- requirements.txt
- main.py

---

## Step 2: Create New Web Service

1. Go to Render Dashboard
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repo

---

## Step 3: Configure Build Settings

- Environment: Python
- Build Command:

```
pip install -r requirements.txt
```

- Start Command:

```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Step 4: Add Environment Variables

```
OPENAI_API_KEY=your_key
PORT=10000
```

---

## Production URL Example

```
https://rag-app-kvjf.onrender.com
```

---

# 🐳 Docker Deployment (Optional)

## Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Build Docker Image

```bash
docker build -t ai-api .
```

## Run Container

```bash
docker run -p 8000:8000 ai-api
```

---

# 🔐 Security Checklist

- Enable HTTPS (Railway/Render provide SSL by default)
- Use environment variables for secrets
- Never hardcode API keys
- Limit file upload size
- Enable CORS properly
- Implement rate limiting (recommended)

---

# 📊 Monitoring Recommendations

- Monitor response time
- Track error logs
- Add health endpoint:

```
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

---

# ⚡ Scaling Recommendations

- Add API versioning (/api/v1/)
- Use Redis for caching
- Add database if user history is needed
- Enable autoscaling on Railway/Render

---

# 💰 Cost Estimation

## Free Tier
- Railway: Free tier (limited hours)
- Render: Free tier (sleep mode enabled)

## Production Tier (Estimated)
- Railway: $7–20/month
- Render: $7–25/month

---

# ✅ Deployment Complete

After deployment:

1. Test `/docs` endpoint
2. Test `/predict` or `/ask`
3. Verify environment variables
4. Monitor logs for errors

---

**Ready for Production 🚀**

