import { Router } from 'express';
import { loginController, registerController, refreshController} from './auth.controller.js';

const router = Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refresh', refreshController);

export default router;