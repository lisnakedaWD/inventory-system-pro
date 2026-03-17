import { Router } from 'express';
import { loginController, registerController, refreshController} from './auth.controller.js';

const router = Router();

router.post('/register', registerController);
router.post('/refresh', refreshController);
router.post('/login', loginLimiter, loginController);

export default router;