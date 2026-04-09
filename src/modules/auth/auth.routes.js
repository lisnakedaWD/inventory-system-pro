import { Router } from 'express';
import { loginController, registerController, refreshController} from './auth.controller.js';
import { loginLimiter } from '../../middlewares/rateLimit.js';


const router = Router();

router.post('/register', registerController);
router.post('/refresh', refreshController);
router.post('/login', loginLimiter, loginController);


export default router;