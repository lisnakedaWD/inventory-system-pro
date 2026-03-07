import { pool } from '../../database/connection.js';

export const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM equipos');
  return rows;
};

//codigo de select
export const create = async ({ nombre, serial }) => {
  const [result] = await pool.query(
    'INSERT INTO equipos (nombre, serial, tenant_id) VALUES (?, ?, ?)',
    [nombre, serial, tenantId]
  );

  return { id: result.insertId, nombre, serial };
};

//codigo de update
export const updateById = async (id, tenantId, data) => {
  const [result] = await pool.query(
    `UPDATE equipos 
     SET nombre = ?, serial = ?
     WHERE id = ? AND tenant_id = ?`,
    [data.nombre, data.serial, id, tenantId]
  );

  return result.affectedRows;
};

//codigo de delete
export const deleteById = async (id, tenantId) => {
  const [result] = await pool.query(
    `DELETE FROM equipos 
     WHERE id = ? AND tenant_id = ?`,
    [id, tenantId]
  );

  return result.affectedRows;
};