import { Router } from 'express';
import {
  createInventory,
  updateInventory,
  deleteInventory,
  getInventory
} from './inventory.controller.js';

import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post('/', authorizeRoles('admin', 'user'), createInventory);
router.put('/:id', authorizeRoles('admin'), updateInventory);
router.delete('/:id', authorizeRoles('admin'), deleteInventory);
router.get('/', authorizeRoles('admin', 'user', 'viewer'), getInventory);

export default router;