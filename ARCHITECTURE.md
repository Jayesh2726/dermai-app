# DermAI Architecture Documentation

> **Complete AI-Powered Dermatology Assistant**  
> Version 2.0 - Updated February 2026

---

## 🏗️ System Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                            USER (Web Browser)                           │
└────────────────────────────┬───────────────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       REACT FRONTEND (Vite)                             │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  PAGES: Home | Analyze | Learn | About                          │  │
│  │  COMPONENTS: Navbar | Chatbot (RAG) | ResultsActions            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────┬───────────────────────────────────────────┘
                             ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER (Node.js)                             │
│  • POST /api/pdf/generate  - PDF with embedded image                   │
│  • pdfGenerator.js         - 2-page professional reports               │
└───────────┬──────────────────────────────────┬─────────────────────────┘
            ▼                                  ▼
┌───────────────────────────┐  ┌──────────────────────────────────────┐
│  FLASK DL API (Railway)   │  │   RAG FASTAPI (Render)               │
│  • CNN Image Classification│  │   • Vector Search + OpenAI GPT-4o   │
└───────────────────────────┘  └──────────────────────────────────────┘
```

## 🎯 NEW Features (Version 2.0)

### 1. RAG-Powered Chatbot
- **Location**: Analyze page only
- **Context-Aware**: Knows what disease was detected + confidence
- **Dynamic Quick Questions**: Updates based on analysis result
- **Enriched Queries**: Transforms vague questions into specific ones
- **Markdown Responses**: Formatted with bold, bullets, proper sizing

### 2. PDF Report Generation
- **2-Page Layout**: Report + embedded uploaded image
- **Color-Coded**: Different colors for each disease
- **Professional Design**: Headers, footers, confidence bars
- **In-Memory Processing**: No permanent storage, privacy-first
- **Auto-Cleanup**: Temporary files deleted after download

### 3. Enhanced UI/UX
- **Floating Chatbot Button**: Bottom-right corner, high z-index
- **Framer Motion Animations**: Smooth transitions throughout
- **Responsive Design**: Mobile-optimized for all screens
- **Loading States**: Clear feedback during operations

---

## 📊 Data Flow - RAG Chatbot

```
User uploads → DL analysis → Result: "Monkeypox (95%)"
                                ↓
        Chatbot receives context (prediction + confidence)
                                ↓
        User asks: "What should I do next?"
                                ↓
        Chatbot enriches: "For Monkeypox at 95% confidence,
                           what steps should I take?"
                                ↓
        RAG API: Retrieves docs + builds system prompt
                                ↓
        OpenAI GPT-4o-mini generates contextualized response
                                ↓
        ReactMarkdown renders formatted answer
```

---

## 🔧 Technology Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| Frontend | React 18 + Vite 5 | SPA framework |
| | ReactMarkdown | Chatbot formatting |
| | Framer Motion 10 | Animations |
| Backend | Express 4 + Node 18 | API server |
| | Multer 1.4 | File uploads |
| | PDFKit 0.13 | PDF generation |
| DL | Flask + TensorFlow | Image classification |
| RAG | FastAPI + OpenAI | Intelligent chatbot |
| Deploy | Vercel/Netlify | Frontend CDN |
| | Railway/Render | Backend APIs |

---

## 📝 Key APIs

### RAG Chatbot API
```
POST https://rag-app-kvjf.onrender.com/ask
{
  question: "What should I do?",
  disease: "Monkeypox",
  confidence: 0.95
}
→ Returns contextualized medical advice
```

### PDF Generation API
```
POST /api/pdf/generate (multipart/form-data)
{
  prediction, confidence, all_predictions, image
}
→ Returns 2-page PDF with report + embedded image
```

### DL Classification API
```
POST /api/predict (multipart/form-data)
{ file: Image }
→ Returns disease prediction + confidence scores
```

---

**Version:** 1.0.0  
**Last Updated:** February 2026
