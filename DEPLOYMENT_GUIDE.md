# VCommerce Cloud Deployment Options

## 🚀 Deployment Platforms

### 1. AWS (Recommended)
```bash
# Deploy using ECS
aws ecs create-cluster --cluster-name vcommerce
aws ecr create-repository --repository-name vcommerce

# Build and push Docker image
docker build -t vcommerce -f Dockerfile.single .
docker tag vcommerce:latest ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/vcommerce:latest
docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/vcommerce:latest
```

### 2. DigitalOcean
```bash
# Create App Platform service
doctl apps create --spec .do/app.yaml
```

### 3. Vercel (Frontend only)
```bash
# Deploy Next.js frontend
vercel --prod
```

## ⚙️ Configuration

### Required Environment Variables
```env
MONGO_URI=your_atlas_connection_string
JWT_SECRET=your_secure_key
NODE_ENV=production
```

## 🔗 Helpful Links
- [AWS ECS Documentation](https://aws.amazon.com/ecs/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
- [Vercel Deployment](https://vercel.com/docs)