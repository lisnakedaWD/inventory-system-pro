import express from 'express';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';



const app = express();

app.use(express.json());

app.use('/auth', authRoutes);  // rutas públicas

app.use(authMiddleware); //  protege todo lo que esté después

app.use('/inventory', inventoryRoutes);

app.use(errorHandler);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;

