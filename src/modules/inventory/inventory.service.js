import * as repository from './inventory.repository.js';
import { UnauthorizedError } from "../../errors/errors.js";
import { redisClient } from "../../config/redis.js";
import { logAction } from "../audit/audit.service.js";

//codigo create
export const createInventory = async (data, user) => {
  if (!data.nombre || !data.serial) {
    throw new UnauthorizedError('Nombre and serial are required');
  }

  const item = await repository.create({
    nombre: data.nombre,
    serial: data.serial,
    tenantId: user.tenantId
  });

  // 🔥 AUDITORÍA
  await logAction({
    user,
    action: "create",
    resource: "inventory",
    resourceId: item.id,
    newData: item
  });

  return item;
};

//codigo de update
export const updateInventory = async (id, user, data) => {

  if (user.role !== 'admin') {
    throw new UnauthorizedError('Only admins can update inventory');
  }

  // 🔥 obtener estado anterior
  const existing = await repository.findById(id, user.tenantId);

  if (!existing) {
    throw new UnauthorizedError('Not found or not allowed');
  }

  const oldData = existing;

  const affected = await repository.updateById(
    id,
    user.tenantId,
    data
  );

  if (affected === 0) {
    throw new UnauthorizedError('Update failed');
  }

  // 🔥 obtener estado nuevo
  const updated = await repository.findById(id, user.tenantId);

  await logAction({
    user,
    action: "update",
    resource: "inventory",
    resourceId: id,
    oldData,
    newData: updated
  });

  return { message: 'Inventory updated successfully' };
};

//codigo de delete
export const deleteInventory = async (id, user) => {

  if (user.role !== 'admin') {
    throw new UnauthorizedError('Only admins can delete inventory');
  }

  // 🔥 obtener antes de borrar
  const existing = await repository.findById(id, user.tenantId);

  if (!existing) {
    throw new UnauthorizedError('Not found or not allowed');
  }

  const oldData = existing;

  const affected = await repository.deleteById(
    id,
    user.tenantId
  );

  if (affected === 0) {
    throw new UnauthorizedError('Delete failed');
  }

  await logAction({
    user,
    action: "delete",
    resource: "inventory",
    resourceId: id,
    oldData
  });

  return { message: 'Inventory deleted successfully' };
};

//codigo paginación y cache

export const getInventory = async ({ page, limit, search, sort }, user) => {

  const cacheKey = `inventory:${user.tenantId}:${page}:${limit}:${search}:${sort}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const offset = (page - 1) * limit;

  const items = await repository.findAll({
    limit,
    offset,
    search,
    sort,
    tenantId: user.tenantId
  });

  const total = await repository.countAll(search, user.tenantId);
  const pages = Math.ceil(total / limit);

  const result = {
    items,
    meta: { page, limit, total, pages }
  };

  await redisClient.setEx(cacheKey, 60, JSON.stringify(result));

  return result;
};