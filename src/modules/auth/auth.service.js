import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as repository from './auth.repository.js';
import { env } from '../../config/env.js';
import { UnauthorizedError } from "../../errors/errors.js";

const SECRET = env.jwtSecret;

export const login = async (email, password) => {

  const user = await repository.findByEmail(email);

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      tenantId: user.tenant_id
    },
    SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    SECRET,
    { expiresIn: '7d' }
  );

  await repository.saveRefreshToken(user.id, refreshToken);

  return {
    accessToken,
    refreshToken
  };
};

export const register = async (email, password, role = "user", tenantId) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  return await repository.createUser({
    email,
    password: hashedPassword,
    role: "user", // 🔥 forzado
    tenantId
  });
};

export const refresh = async (refreshToken) => {

  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token required");
  }

  const decoded = jwt.verify(refreshToken, SECRET);

  const tokenFromDb = await repository.findRefreshToken(refreshToken);

  if (!tokenFromDb) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  // 🔥 obtener usuario real
  const user = await repository.findById(decoded.id);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  // eliminar token viejo
  await repository.deleteRefreshToken(refreshToken);

  const newAccessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      tenantId: user.tenant_id
    },
    SECRET,
    { expiresIn: '15m' }
  );

  const newRefreshToken = jwt.sign(
    { id: user.id },
    SECRET,
    { expiresIn: '7d' }
  );

  await repository.saveRefreshToken(user.id, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};