# DermAI - Skin Disease Detection System

A lightweight, modern MERN stack application for AI-powered skin disease detection.

## 🚀 Features

- **AI-Powered Analysis**: Detect Chickenpox, Measles, Monkeypox, and Normal skin
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Real-time Results**: Instant predictions with confidence scores
- **Educational Content**: Learn about different skin conditions
- **Privacy-Focused**: Secure image processing
- **Mobile-Responsive**: Works on all devices

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite (fast build tool)
- React Router DOM
- Framer Motion (animations)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- CORS enabled
- Proxy to Flask ML API

### AI/ML
- Flask API hosted on Railway
- Deep Learning model for image classification

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Git

### Setup Instructions

1. **Clone or extract the project**
```bash
cd dermai-app
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Environment Configuration**

Server `.env` file is already configured:
```
PORT=5000
FLASK_API_URL=https://monkeypox-disease-detection-production.up.railway.app
NODE_ENV=development
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
├── server/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Home.css
│   │   │   ├── Analyze.jsx    # Image upload & analysis
│   │   │   ├── Analyze.css
│   │   │   ├── Learn.jsx      # Disease library
│   │   │   ├── Learn.css
│   │   │   ├── About.jsx      # About page
│   │   │   └── About.css
│   │   ├── styles/
│   │   │   └── App.css        # Global styles
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
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

The app connects directly to the Flask API on Railway:

**Endpoint**: `https://monkeypox-disease-detection-production.up.railway.app/api/predict`

**Method**: POST

**Request**: FormData with image file

**Response**:
```json
{
  "prediction": "Chickenpox",
  "confidence": 0.95,
  "all_predictions": {
    "Chickenpox": 0.95,
    "Measles": 0.03,
    "Monkeypox": 0.01,
    "Normal": 0.01
  }
}
```

## 📱 Pages

1. **Home** (`/`)
   - Hero section with gradient
   - Feature cards
   - How it works section
   - Call-to-action

2. **Analyze** (`/analyze`)
   - Drag & drop image upload
   - Real-time analysis
   - Confidence scores visualization
   - Result cards

3. **Learn** (`/learn`)
   - Disease library
   - Search functionality
   - Detailed disease information
   - Symptoms & treatment

4. **About** (`/about`)
   - Mission statement
   - How it works
   - Technology stack
   - Important disclaimers

## 🔒 Privacy & Security

- Images are processed in real-time
- No permanent storage of user images
- Secure HTTPS communication
- CORS enabled for API access

## ⚠️ Important Disclaimer

This application is for **educational purposes only** and should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### CORS Issues
Ensure the Flask API has CORS enabled. The backend proxy should handle most CORS issues.

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This is an educational project. Please ensure compliance with medical regulations in your jurisdiction before deploying for public use.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding user authentication
- Implementing data persistence
- Adding more robust error handling
- Conducting thorough medical validation
- Obtaining proper certifications

## 📧 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
