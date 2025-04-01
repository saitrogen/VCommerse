# Single-container production Dockerfile
FROM node:18-alpine AS builder

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

# Build backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend .

# Runtime image
FROM node:18-alpine
WORKDIR /app

# Copy built assets
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/backend ./backend

# Install production dependencies
WORKDIR /app/backend
RUN npm ci --only=production

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["node", "src/index.js"]