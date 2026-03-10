import { login, register, refresh } from './auth.service.js';

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

export const registerController = async (req, res, next) => {
  try {
    const { email, password, role, tenantId } = req.body;

    const result = await register(email, password, role, tenantId);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const refreshController = async (req, res, next) => {
  try {

    const { refreshToken } = req.body;

    const result = await refresh(refreshToken);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};