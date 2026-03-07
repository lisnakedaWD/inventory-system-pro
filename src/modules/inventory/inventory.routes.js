import { Router } from 'express';
import { getInventory } from './inventory.controller.js';
import { create } from './inventory.controller.js';

const router = Router();

router.get('/', getInventory);
router.post('/', create);

export default router;