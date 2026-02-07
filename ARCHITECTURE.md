# DermAI Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                     (Web Browser)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  REACT FRONTEND                              │
│                  (Port 3000)                                 │
│  ┌───────────┬──────────┬──────────┬──────────┐            │
│  │   Home    │ Analyze  │  Learn   │  About   │            │
│  │   Page    │   Page   │   Page   │   Page   │            │
│  └───────────┴──────────┴──────────┴──────────┘            │
│                                                              │
│  Components: Navbar, Cards, Forms                           │
│  Styling: CSS with Inter font                               │
│  Animations: Framer Motion                                  │
│  Routing: React Router DOM                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ API Requests (Axios)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXPRESS SERVER                               │
│                  (Port 5000)                                 │
│                                                              │
│  Endpoints:                                                  │
│  - GET  /api/health                                         │
│  - POST /api/predict  ──┐                                   │
│  - GET  /api/info       │                                   │
│  - GET  /api/classes    │                                   │
│                          │                                   │
│  Middleware:             │                                   │
│  - CORS                  │                                   │
│  - JSON Parser           │                                   │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           │ Proxy Requests
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              FLASK ML API (Railway)                          │
│   https://monkeypox-disease-detection-production...         │
│                                                              │
│  Endpoints:                                                  │
│  - POST /api/predict  (Image Classification)                │
│  - GET  /api/info     (Model Information)                   │
│  - GET  /api/classes  (Available Classes)                   │
│                                                              │
│  Model:                                                      │
│  - Deep Learning CNN                                         │
│  - Classes: Chickenpox, Measles, Monkeypox, Normal         │
│  - Returns: Predictions + Confidence Scores                 │
└─────────────────────────────────────────────────────────────┘

DATA FLOW:
==========

1. User uploads image on Analyze page
2. React sends FormData to Express server
3. Express proxies request to Flask API
4. Flask ML model processes image
5. Returns predictions with confidence scores
6. Express forwards response to React
7. React displays results with animations
```

## Key Features

### Frontend (React)
- **Lightweight**: Minimal dependencies, fast loading
- **Modern UI**: Clean design with gradient effects
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions with Framer Motion

### Backend (Express)
- **Simple Proxy**: Routes requests to Flask API
- **CORS Enabled**: Cross-origin resource sharing
- **Error Handling**: Graceful error responses
- **Environment Config**: Easy deployment

### ML API (Flask/Railway)
- **Pre-trained Model**: Ready for predictions
- **REST API**: Standard HTTP endpoints
- **High Availability**: Hosted on Railway
- **Fast Processing**: Real-time results
