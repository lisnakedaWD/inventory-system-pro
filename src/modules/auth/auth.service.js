import jwt from 'jsonwebtoken';
import * as repository from './auth.repository.js';

const SECRET = 'supersecret'; // luego lo pasamos a .env

export const login = async (email, password) => {

  const user = await repository.findByEmail(email);

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      tenantId: user.tenant_id
    },
    SECRET,
    { expiresIn: '1h' }
  );

  return { token };
};