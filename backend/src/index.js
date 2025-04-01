import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read Swagger JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../swagger.json'))
);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'VCommerce API is running',
    documentation: 'http://localhost:3000/api-docs',
    frontend: 'http://localhost:3001',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me'
      },
      products: {
        list: 'GET /api/products',
        create: 'POST /api/products',
        details: 'GET /api/products/:id'
      }
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
});