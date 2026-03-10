import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as repository from './auth.repository.js';
import { env } from '../../config/env.js';

const SECRET = env.jwtSecret;

export const login = async (email, password) => {

  const user = await repository.findByEmail(email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Invalid credentials');
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

export const register = async (email, password, role, tenantId) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  return await repository.createUser({
    email,
    password: hashedPassword,
    role,
    tenantId
  });
};

export const refresh = async (refreshToken) => {

  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  const decoded = jwt.verify(refreshToken, SECRET);

  const accessToken = jwt.sign(
    { id: decoded.id },
    SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken };
};