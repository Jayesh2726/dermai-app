# DermAI - AI-Powered Dermatology Assistant

> **Complete skin disease detection system with RAG-powered chatbot and professional PDF reports**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat&logo=openai)](https://openai.com/)

**🔗 Quick Links:**
- [Live Demo](#) (Add your deployed URL)
- [Architecture Diagram](./DermAI-Architecture-Diagram.drawio)
- [API Documentation](#-api-integration)
- [Deployment Guide](#-deployment)

---

A modern, full-stack application that combines deep learning image classification with intelligent conversational AI to provide comprehensive skin disease analysis and guidance.

## ✨ Features

### 🤖 AI-Powered Analysis
- **Image Classification**: Detect Chickenpox, Measles, Monkeypox, and Normal skin
- **Confidence Scores**: Visual confidence bars for all predictions
- **Real-time Results**: Instant analysis with detailed breakdowns

### 💬 RAG Chatbot Assistant
- **Context-Aware**: Knows your diagnosis and confidence level
- **Smart Responses**: Uses Retrieval-Augmented Generation for accurate medical information
- **Dynamic Questions**: Quick question buttons adapt to your analysis
- **Markdown Formatting**: Clean, readable responses with bullets and emphasis

### 📄 Professional PDF Reports
- **2-Page Reports**: Complete analysis report + your uploaded image
- **Color-Coded Design**: Disease-specific visual themes
- **Comprehensive Details**: Predictions, precautions, medical disclaimers
- **Instant Download**: Generate and download in seconds

### 🎨 Modern UI/UX
- **Responsive Design**: Works beautifully on all devices
- **Smooth Animations**: Framer Motion for fluid transitions
- **Floating Chatbot**: Always accessible from bottom-right corner
- **Educational Library**: Comprehensive disease information

## 📸 Screenshots & Demo

### Main Application Flow

```
1️⃣ Upload Image → 2️⃣ Get Analysis → 3️⃣ Chat with AI → 4️⃣ Download PDF
```

**Key Screens:**
- **Home Page**: Hero section with gradient, feature cards, how it works
- **Analyze Page**: Drag-drop upload, real-time analysis, confidence bars
- **Chatbot**: Floating assistant with context-aware responses
- **PDF Report**: Professional 2-page report with embedded image
- **Learn Page**: Disease library with detailed information

### Feature Highlights

| Feature | Description | Status |
|---------|-------------|--------|
| 🖼️ Image Upload | Drag & drop or click | ✅ Working |
| 🤖 DL Classification | 4-class CNN model | ✅ Working |
| 💬 RAG Chatbot | GPT-4o-mini powered | ✅ Working |
| 📄 PDF Reports | Professional layout | ✅ Working |
| 📱 Responsive | Mobile-first design | ✅ Working |
| 🎨 Animations | Framer Motion | ✅ Working |

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite 5** - Lightning-fast build tool
- **React Router DOM 6** - Client-side routing
- **Framer Motion 10** - Smooth animations
- **ReactMarkdown** - Chatbot response formatting
- **Custom CSS** - Lightweight styling with CSS variables

### Backend
- **Node.js 18+** - Runtime environment
- **Express 4** - Web framework
- **Multer 1.4** - File upload handling (in-memory)
- **PDFKit 0.13** - Professional PDF generation
- **CORS** - Cross-origin resource sharing

### AI/DL Services
- **Flask API** (Railway) - CNN image classification
- **RAG FastAPI** (Render) - Intelligent chatbot with vector search
- **OpenAI GPT-4o-mini** - Natural language generation
- **OpenAI text-embedding-ada-002** - Vector embeddings for RAG

## 📦 Installation

### Prerequisites
- **Node.js 18+** and npm
- **Git**
- **OpenAI API Key** (for RAG chatbot - optional)

### Quick Start

1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd dermai-app
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

Key backend dependencies:
- `express` - Web framework
- `pdfkit` - PDF generation
- `multer` - File uploads
- `cors` - CORS handling

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

Key frontend dependencies:
- `react` - UI framework
- `framer-motion` - Animations
- `react-markdown` - Chatbot formatting
- `react-router-dom` - Routing

4. **Environment Configuration**

Create `server/.env`:
```bash
PORT=5000
FLASK_API_URL=https://monkeypox-disease-detection-production.up.railway.app
NODE_ENV=development
```

**Optional - For RAG Chatbot:**
If you deployed the RAG FastAPI, no additional backend config needed. The chatbot connects directly from the frontend to:
```
https://rag-app-kvjf.onrender.com/ask
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

2. **Start the Frontend** (in a new terminal)
```bash
cd client
npm run dev
# App runs on http://localhost:3000
```

3. **Open your browser**
Navigate to `http://localhost:3000`

### Production Build

```bash
cd client
npm run build
# Creates optimized build in client/dist
```

## 📁 Project Structure

```
dermai-app/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Chatbot.jsx          # RAG-powered AI assistant
│   │   │   ├── Chatbot.css          # Chatbot styles
│   │   │   ├── ResultsActions.jsx   # PDF download buttons
│   │   │   └── ResultsActions.css
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Analyze.jsx         # Image upload & analysis
│   │   │   ├── Learn.jsx           # Disease library
│   │   │   └── About.jsx           # About page
│   │   ├── styles/
│   │   │   └── App.css             # Global styles
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Express Backend
│   ├── routes/
│   │   ├── chat.js                  # Chatbot proxy (optional)
│   │   ├── pdf.js                   # PDF generation
│   │   └── upload.js                # Image upload
│   ├── utils/
│   │   └── pdfGenerator.js          # PDF creation logic
│   ├── server.js                    # Express server
│   ├── package.json
│   └── .env                         # Environment variables
│
├── RAGFastAPI/               # RAG Chatbot Service (Optional)
│   ├── main.py                      # FastAPI server
│   ├── retriever.py                 # Vector search
│   ├── requirements.txt
│   └── dockerfile
│
├── README.md                  # This file
├── ARCHITECTURE.md            # System architecture
└── DermAI-Architecture-Diagram.drawio  # Visual diagram
```

## 🎨 Design Features

### Lightweight UI
- Minimal dependencies
- Clean, modern design
- Smooth animations with Framer Motion
- Responsive grid layouts

### Color Scheme
- Primary: `#3B82F6` (Blue)
- Secondary: `#10B981` (Green)
- Background: `#FAFAFA`
- Surface: `#FFFFFF`

### Typography
- Font: Inter (clean, modern sans-serif)
- Optimized for readability

## 🔌 API Integration

The application integrates with three APIs:

### 1. Flask DL API (Image Classification)

**URL**: `https://monkeypox-disease-detection-production.up.railway.app`

**Endpoint**: `POST /api/predict`

**Request**: 
```javascript
// FormData with image file
const formData = new FormData();
formData.append('file', imageFile);
```

**Response**:
```json
{
  "predicted_class": "Monkeypox",
  "confidence": 0.9523,
  "all_predictions": {
    "Monkeypox": 0.9523,
    "Chickenpox": 0.0312,
    "Measles": 0.0098,
    "Normal": 0.0067
  }
}
```

### 2. RAG FastAPI (Chatbot)

**URL**: `https://rag-app-kvjf.onrender.com`

**Endpoint**: `POST /ask`

**Request**:
```json
{
  "question": "What should I do next?",
  "disease": "Monkeypox",
  "confidence": 0.95
}
```

**Response**:
```json
{
  "answer": "For Monkeypox at 95% confidence:\n\n**Immediate Steps:**\n• Isolate yourself...",
  "sources": ["doc_1", "doc_2"]
}
```

### 3. Express Backend (PDF Generation)

**Endpoint**: `POST /api/pdf/generate`

**Request**: 
```javascript
// FormData with prediction data + image
const formData = new FormData();
formData.append('prediction', 'Monkeypox');
formData.append('confidence', 0.95);
formData.append('all_predictions', JSON.stringify({...}));
formData.append('image', imageFile);
```

**Response**: PDF file (application/pdf)

## 📱 Application Pages

### 1. Home (`/`)
- Hero section with gradient background
- Feature showcase cards
- "How it works" 3-step process
- Call-to-action buttons
- Smooth scroll animations

### 2. Analyze (`/analyze`) ⭐ NEW FEATURES
- **Drag & drop** or click to upload images
- **Real-time analysis** with loading states
- **Confidence visualization** - bars for all 4 classes
- **RAG Chatbot** - Context-aware AI assistant
  - Knows your diagnosis and confidence
  - Dynamic quick questions
  - Markdown-formatted responses
- **PDF Download** - Professional 2-page report with your image
- **Learn More** button - Navigate to disease details

### 3. Learn (`/learn`)
- Disease library with 4 conditions
- Search and filter functionality
- Detailed disease cards
- Symptoms, treatments, prevention
- Medical guidelines

### 4. About (`/about`)
- Mission statement
- Technology stack overview
- How the AI works
- Team information
- Medical disclaimers

## 🔒 Privacy & Security

### Data Protection
- ✅ **Images**: Processed in-memory only, never stored permanently
- ✅ **Analysis Results**: Session-only, no database persistence
- ✅ **PDF Generation**: Temporary files auto-deleted after download
- ✅ **Chatbot**: No conversation history stored
- ✅ **HTTPS**: Secure encrypted communication

### Medical Compliance
- ⚠️ **Not HIPAA Compliant** - Educational purposes only
- ⚠️ **No PHI Collection** - No personal health information stored
- ⚠️ **Prominent Disclaimers** - Clear warnings displayed throughout
- ⚠️ **Not a Diagnostic Tool** - Always consult healthcare professionals

## ⚠️ Important Disclaimer

This application is for **educational purposes only** and should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

## 🎯 Key Features Explained

### RAG Chatbot System

**What is RAG?**
Retrieval-Augmented Generation combines:
- **Vector Search**: Finds relevant medical information from knowledge base
- **Context Injection**: Adds your diagnosis details to the prompt
- **LLM Generation**: GPT-4o-mini generates personalized responses

**How It Works:**
1. You get your analysis result (e.g., "Monkeypox 95%")
2. Chatbot receives this context automatically
3. You ask: "What should I do next?"
4. System enriches your question with diagnosis context
5. Retrieves relevant medical information via vector search
6. Sends to GPT-4o-mini with full context
7. Returns personalized, accurate medical guidance

**Features:**
- 🎯 Context-aware of your specific diagnosis
- 💬 Natural language conversations
- 📊 Dynamic quick questions based on your result
- 🔍 Grounded in medical knowledge base (reduces hallucination)
- ⚡ Fast responses (~3-6 seconds)

### PDF Report Generation

**2-Page Professional Reports:**

**Page 1 - Analysis Report:**
- Header with DermAI branding and timestamp
- Color-coded prediction box (different color per disease)
- Disease description
- All 4 predictions with visual confidence bars
- Recommended precautions (5-10 specific points)
- Medical disclaimer (prominent)
- Learn more URL with disease-specific link

**Page 2 - Your Image:**
- "Uploaded Image" header
- Your original uploaded image (centered, scaled, aspect-ratio preserved)
- Footer with branding

**Technical Details:**
- Generated server-side with PDFKit
- Images processed in-memory (never saved to disk)
- Auto-cleanup after download
- Unique filename with timestamp
- Professional medical report template

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   USER (Browser)                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           REACT FRONTEND (Vite)                         │
│  Pages: Home | Analyze | Learn | About                 │
│  Components: Navbar | Chatbot | ResultsActions         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          EXPRESS SERVER (Node.js)                       │
│  Routes: /api/pdf/generate | /api/upload               │
│  Services: pdfGenerator.js                              │
└───────────┬──────────────────────────┬──────────────────┘
            │                          │
            ▼                          ▼
┌───────────────────────┐  ┌──────────────────────────────┐
│  FLASK DL API         │  │  RAG FASTAPI                 │
│  (Railway)            │  │  (Render)                    │
│  • CNN Classification │  │  • Vector Search             │
│  • 4 Disease Classes  │  │  • OpenAI GPT-4o-mini       │
└───────────────────────┘  └──────────────────────────────┘
```

**For detailed architecture**, see `ARCHITECTURE.md` or open `DermAI-Architecture-Diagram.drawio` in [draw.io](https://app.diagrams.net)

## 🐛 Troubleshooting

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000 (or 5173 for Vite)
npx kill-port 3000
npx kill-port 5173
```

### CORS Issues
Ensure the Flask API has CORS enabled. The backend proxy should handle most CORS issues.

### RAG Chatbot Not Responding
1. **Check Render service status**: Visit https://rag-app-kvjf.onrender.com
2. **Cold start delay**: First request may take 30-60 seconds (free tier)
3. **Check browser console**: Look for network errors
4. **Verify API URL**: Check `Chatbot.jsx` has correct RAG_API_URL

### PDF Generation Fails
1. **Check image size**: Must be under 10MB
2. **Check image format**: Only JPG, PNG, WEBP supported
3. **Check server logs**: `cd server && npm run dev` to see errors
4. **Verify Multer config**: Should use `memoryStorage()`

### Chatbot Shows "Connecting..."
1. **Render free tier**: Service sleeps after 15 min of inactivity
2. **Wait 30-60 seconds** for service to wake up
3. **Check deployment**: Ensure RAG FastAPI is deployed to Render

### PDF Download Not Working
1. **Check browser download settings**: May be blocked by popup blocker
2. **Check console errors**: Look for "Blob" or "URL" errors
3. **Verify route**: Ensure `/api/pdf/generate` is accessible
4. **Test with curl**:
```bash
curl -X POST http://localhost:5000/api/pdf/generate \
  -F "prediction=Monkeypox" \
  -F "confidence=0.95" \
  -F "all_predictions={\"Monkeypox\":0.95}" \
  -F "image=@test-image.jpg" \
  -o test.pdf
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If React/Vite errors persist
cd client
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

### Module Not Found Errors
```bash
# Backend missing dependencies
cd server
npm install express cors multer pdfkit

# Frontend missing dependencies
cd client
npm install react react-dom react-router-dom framer-motion react-markdown
```

## 📝 License

This is an educational project. Please ensure compliance with medical regulations in your jurisdiction before deploying for public use.

## 🤝 Contributing

This is a demonstration project showing modern AI application architecture. For production use, consider:

### Recommended Enhancements
- [ ] **User Authentication** - Add Google OAuth or email/password
- [ ] **Database Integration** - Store analysis history (optional)
- [ ] **Conversation Memory** - Multi-turn chatbot conversations
- [ ] **Citation System** - Show sources for chatbot responses
- [ ] **Advanced RAG** - Implement reranking, hybrid search
- [ ] **Email Reports** - Send PDF reports via email
- [ ] **Multi-language Support** - i18n for global accessibility
- [ ] **Voice Input** - Speak to the chatbot
- [ ] **Mobile App** - React Native version
- [ ] **Analytics Dashboard** - Track usage and accuracy
- [ ] **A/B Testing** - Optimize UI/UX
- [ ] **Medical Validation** - Clinical trials and certifications
- [ ] **Compliance** - HIPAA, GDPR if handling real patient data

### Code Quality
- [ ] Add unit tests (Jest)
- [ ] Add integration tests (Cypress)
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Add error monitoring (Sentry)
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] TypeScript migration (optional)

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

**Vercel:**
```bash
cd client
npm run build
vercel --prod
```

**Netlify:**
```bash
cd client
npm run build
netlify deploy --prod --dir=dist
```

**Environment Variables:**
```bash
VITE_API_URL=https://your-backend.com
```

### Backend Deployment (Railway/Render)

**Railway:**
1. Connect GitHub repository
2. Set root directory to `/server`
3. Add environment variables:
   - `PORT=5000`
   - `FLASK_API_URL=https://...railway.app`
4. Deploy automatically on push

**Render:**
1. Create new Web Service
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

### RAG FastAPI Deployment (Render)

**Already deployed at:** https://rag-app-kvjf.onrender.com

**To deploy your own:**
```bash
cd RAGFastAPI
# Create requirements.txt with:
# fastapi
# uvicorn
# openai
# python-dotenv

# Deploy to Render:
# 1. Connect repo
# 2. Set build: pip install -r requirements.txt
# 3. Set start: uvicorn main:app --host 0.0.0.0 --port 8000
# 4. Add env: OPENAI_API_KEY=sk-...
```

### Complete Deployment Checklist
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Backend deployed to Railway/Render
- [ ] RAG API deployed to Render (optional)
- [ ] Environment variables configured
- [ ] CORS origins updated for production
- [ ] SSL certificates enabled (HTTPS)
- [ ] Custom domain configured (optional)
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics configured (Google Analytics)

## 📧 Support

## 📧 Support

For issues or questions:

1. **Check Documentation**:
   - `README.md` - This file (setup and features)
   - `ARCHITECTURE.md` - System architecture details
   - `DermAI-Architecture-Diagram.drawio` - Visual diagram

2. **Common Issues**: See [Troubleshooting](#-troubleshooting) section above

3. **API Status**:
   - Flask DL API: https://monkeypox-disease-detection-production.up.railway.app
   - RAG API: https://rag-app-kvjf.onrender.com

4. **GitHub Issues**: Create an issue in the repository

## 📚 Additional Resources

- **OpenAI Documentation**: https://platform.openai.com/docs
- **PDFKit Documentation**: https://pdfkit.org
- **Framer Motion**: https://www.framer.com/motion
- **React Router**: https://reactrouter.com
- **Vite Guide**: https://vitejs.dev/guide

## 🎓 Learning Resources

Want to understand how this works?

1. **RAG Systems**: Learn about Retrieval-Augmented Generation
2. **Vector Databases**: Understand embeddings and similarity search
3. **React Patterns**: Modern component architecture
4. **PDF Generation**: Server-side document creation
5. **Medical AI Ethics**: Responsible AI in healthcare

---

**Built with ❤️ using React, Node.js, FastAPI, and OpenAI**

**Stack**: MERN + RAG + PDF Generation  
**Version**: 2.0.0  
**Last Updated**: February 2026
