import { pool } from '../../database/connection.js';



//codigo de select
export const create = async ({ nombre, serial, tenantId }) => {

  const [result] = await pool.query(
    `INSERT INTO equipos (nombre, serial, tenant_id)
     VALUES (?, ?, ?)`,
    [nombre, serial, tenantId]
  );

  return {
    id: result.insertId,
    nombre,
    serial,
    tenantId
  };

};

//codigo de update
export const updateById = async (id, tenantId, data) => {

  const fields = [];
  const values = [];

  if (data.nombre !== undefined) {
    fields.push("nombre = ?");
    values.push(data.nombre);
  }

  if (data.serial !== undefined) {
    fields.push("serial = ?");
    values.push(data.serial);
  }

  if (fields.length === 0) return 0;

  values.push(id, tenantId);

  const [result] = await pool.query(
    `UPDATE equipos 
     SET ${fields.join(", ")}
     WHERE id = ? AND tenant_id = ?`,
    values
  );

  return result.affectedRows;
};

//codigo paginación

export const findAll = async ({ limit, offset, search, sort, tenantId }) => {

  const allowedSort = ["id", "nombre", "serial"];
  const sortField = allowedSort.includes(sort) ? sort : "id";

  const [rows] = await pool.query(
    `SELECT * FROM equipos
     WHERE nombre LIKE ? AND tenant_id = ?
     ORDER BY ${sortField}
     LIMIT ? OFFSET ?`,
    [`%${search}%`, tenantId, limit, offset]
  );

  return rows;
};

//codigo count

export const countAll = async (search, tenantId) => {

  const [rows] = await pool.query(
    `SELECT COUNT(*) as total
     FROM equipos
     WHERE nombre LIKE ? AND tenant_id = ?`,
    [`%${search}%`, tenantId]
  );

  return rows[0].total;
};

export const findById = async (id, tenantId) => {

  const [rows] = await pool.query(
    `SELECT * FROM equipos 
     WHERE id = ? AND tenant_id = ?`,
    [id, tenantId]
  );

  return rows[0] || null;
};
