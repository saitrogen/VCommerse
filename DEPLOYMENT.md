# VCommerce Deployment Guide

## 🚀 Deployment Options

### 1️⃣ Single Container Deployment (All-in-one)
```bash
# Build and run the combined container
docker build -t vcommerce -f Dockerfile.single .
docker run -p 3000:3000 vcommerce
```

### 2️⃣ Multi-Container Deployment (Microservices)
```bash
# Start all services with docker-compose
docker-compose up --build

# For production:
docker-compose -f docker-compose.yml up --build -d
```

## ⚙️ Configuration

### Environment Variables
Required in `.env`:
```env
MONGO_URI=mongodb+srv://Admin:Admin786@cluster0.krbh692.mongodb.net/vcommerce?retryWrites=true&w=majority
JWT_SECRET=your_secure_secret_here
PORT=3000
NODE_ENV=production
```

## 🔌 Access Points
- Frontend UI: http://localhost:3001
- Backend API: http://localhost:3000/api
- API Docs: http://localhost:3000/api-docs

## 🏗️ Production Checklist
1. [ ] Set up HTTPS with valid certificate
2. [ ] Configure proper CORS origins
3. [ ] Implement monitoring (Prometheus + Grafana)
4. [ ] Set up MongoDB Atlas backups
5. [ ] Configure CI/CD pipeline
6. [ ] Enable logging and log rotation

## 🛠️ Maintenance Commands
```bash
# View running containers
docker ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down