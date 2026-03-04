import express from 'express';
import inventoryRoutes from './modules/inventory/inventory.routes.js';

const app = express();

app.use(express.json());

app.use('/inventory', inventoryRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;