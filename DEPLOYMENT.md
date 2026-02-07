# Deployment Guide

## Local Development

### Prerequisites
- Node.js 16+ installed
- npm installed
- Two terminal windows

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```
Expected output: `🚀 Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
```
Expected output: `Local: http://localhost:3000`

### Test the Application
1. Open `http://localhost:3000`
2. Navigate to "Analyze" page
3. Upload a test image
4. View AI predictions

---

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

**Deploy Frontend:**
```bash
cd client
npm run build
# Upload dist/ folder to Vercel
```

**Environment Variables:**
- `VITE_API_URL`: Your backend API URL

### Option 2: Netlify (Frontend)

```bash
cd client
npm run build
# Drag dist/ folder to Netlify
```

### Option 3: Railway/Render (Backend)

**Deploy Backend:**
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `FLASK_API_URL`: Your Flask API URL
   - `PORT`: 5000

### Option 4: Docker (Full Stack)

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Environment Variables

### Server (.env)
```env
PORT=5000
FLASK_API_URL=https://monkeypox-disease-detection-production.up.railway.app
NODE_ENV=production
```

### Client (Optional)
```env
VITE_API_URL=http://localhost:5000
```

---

## Performance Optimization

### Frontend
- **Code Splitting**: Already enabled via Vite
- **Lazy Loading**: Consider adding for images
- **CDN**: Deploy to Vercel/Netlify for edge caching
- **Compression**: Gzip enabled by default in production builds

### Backend
- **Caching**: Add Redis for API response caching
- **Rate Limiting**: Implement to prevent abuse
- **Monitoring**: Add error tracking (Sentry)

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] API rate limiting implemented
- [ ] Input validation on uploads
- [ ] File size limits enforced
- [ ] Error messages don't expose system details
- [ ] Environment variables secured
- [ ] Dependencies updated regularly

---

## Monitoring

### Recommended Tools
- **Frontend**: Vercel Analytics, Google Analytics
- **Backend**: PM2, Railway logs
- **Errors**: Sentry, LogRocket
- **Uptime**: UptimeRobot, Pingdom

### Key Metrics
- API response time
- Image upload success rate
- Prediction accuracy
- User engagement
- Error rates

---

## Scaling Considerations

### Current Limitations
- Single server instance
- No database (stateless)
- No user authentication
- No image persistence

### Future Enhancements
- **Database**: MongoDB for user data, history
- **Authentication**: JWT tokens, OAuth
- **File Storage**: AWS S3, Cloudinary
- **Load Balancing**: Nginx, AWS ELB
- **Caching**: Redis for predictions
- **CDN**: CloudFront, Cloudflare

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Ensure backend CORS middleware is configured
- Check FLASK_API_URL in .env
- Verify proxy settings in vite.config.js

### Port Conflicts
```bash
# Kill port 3000
npx kill-port 3000

# Kill port 5000
npx kill-port 5000
```

### Production Build Issues
```bash
# Test production build locally
cd client
npm run build
npm run preview
```

---

## Cost Estimation

### Free Tier (Perfect for Testing)
- **Frontend**: Vercel/Netlify (Free)
- **Backend**: Railway/Render (Free tier)
- **ML API**: Already on Railway
- **Total**: $0/month

### Production Tier
- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Railway/Render ($7-20/month)
- **Database**: MongoDB Atlas ($9/month)
- **CDN**: Cloudflare (Free)
- **Total**: ~$36-49/month

---

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor error logs
- Review user feedback
- Update disease information
- Test with new images

### Backup Strategy
- Code: GitHub/GitLab
- Data: MongoDB backups (if implemented)
- Environment: Document all configs
- Images: No permanent storage needed

---

**Ready to Deploy!** 🚀

Start with local testing, then deploy to free tiers before scaling up.
