import { pool } from '../../database/connection.js';

export const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM equipos');
  return rows;
};

export const create = async ({ nombre, serial }) => {
  const [result] = await pool.query(
    'INSERT INTO equipos (nombre, serial) VALUES (?, ?)',
    [nombre, serial]
  );

  return { id: result.insertId, nombre, serial };
};