import { pool } from '../../database/connection.js';

export const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM equipos');
  return rows;
};