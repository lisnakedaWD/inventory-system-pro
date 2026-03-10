import { pool } from '../../database/connection.js';

export const findByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
};

export const createUser = async ({ email, password, role, tenantId }) => {

  const [result] = await pool.query(
    `INSERT INTO usuarios (email, password, role, tenant_id)
     VALUES (?, ?, ?, ?)`,
    [email, password, role, tenantId]
  );

  return result.insertId;
};

export const saveRefreshToken = async (userId, token) => {

  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token)
     VALUES (?, ?)`,
    [userId, token]
  );

};