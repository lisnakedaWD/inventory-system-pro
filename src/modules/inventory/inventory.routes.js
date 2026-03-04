import { Router } from 'express';
import { getInventory } from './inventory.controller.js';

const router = Router();

router.get('/', getInventory);

export default router;