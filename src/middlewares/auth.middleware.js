import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const SECRET = env.jwtSecret;

export const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Leer header correctamente
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token required'
      });
    }

    // 2️⃣ Extraer token
    const token = authHeader.split(' ')[1];

    // 3️⃣ Verificar token
    const decoded = jwt.verify(token, SECRET);

    // 4️⃣ Validar estructura mínima (🔥 clave para ABAC)
    if (!decoded.id || !decoded.role || !decoded.tenantId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
      });
    }

    // 5️⃣ Sanitizar lo que guardas en req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,
      tenantId: decoded.tenantId
    };

    next();

  } catch (error) {
    console.error('Auth error:', error.message);

    // 🔥 Diferenciar errores
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};