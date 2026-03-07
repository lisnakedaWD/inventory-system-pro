import { login } from './auth.service.js';

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};