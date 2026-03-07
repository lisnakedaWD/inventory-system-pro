import { Router } from 'express';
import { getInventory } from './inventory.controller.js';
import { create } from './inventory.controller.js';
import {update} from './inventory.controller.js';
import {remove} from './inventory.controller.js';

const router = Router();

router.get('/', getInventory);
router.post('/', create); //codigo de select
router.put('/:id', update); //codigo de update
router.delete('/:id', remove); //codigo de delete

export default router;