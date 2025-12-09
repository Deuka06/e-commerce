import express from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import courierRoutes from './routes/courierRoutes.js';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// --- Swagger ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'], // енді swagger тек routes ішінен оқиды!
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/courier', courierRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger UI at http://localhost:3000/api-docs');
  console.log('Swagger JSON at http://localhost:3000/swagger.json');
});
