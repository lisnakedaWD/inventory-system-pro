import * as repository from './inventory.repository.js';
import { UnauthorizedError } from "../../errors/errors.js";
import { redisClient } from "../../config/redis.js";

export const createInventory = async (data) => {
  if (!data.nombre || !data.serial) {
    throw new UnauthorizedError('Nombre and serial are required');
  }

//codigo de select
  return await repository.create(data, user.tenantId);
};

//codigo de update
export const updateInventory = async (id, user, data) => {

  if (user.role !== 'admin') {
    throw new UnauthorizedError('Only admins can update inventory');
  }

  const affected = await repository.updateById(
    id,
    user.tenantId,
    data
  );

  if (affected === 0) {
    throw new UnauthorizedError('Not found or not allowed');
  }

  return { message: 'Inventory updated successfully' };
};

//codigo de delete
export const deleteInventory = async (id, user) => {

  if (user.role !== 'admin') {
    throw new UnauthorizedError('Only admins can delete inventory');
  }

  const affected = await repository.deleteById(
    id,
    user.tenantId
  );

  if (affected === 0) {
    throw new UnauthorizedError('Not found or not allowed');
  }

  return { message: 'Inventory deleted successfully' };
};

//codigo paginación y cache

export const getInventory = async ({ page, limit, search, sort }) => {

  const cacheKey = `inventory:${page}:${limit}:${search}:${sort}`;

  // Buscar en cache
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log("⚡ Data from cache");
    return JSON.parse(cached);
  }

  // Si no está, consultar DB
  const offset = (page - 1) * limit;

  const items = await repository.findAll({
    limit,
    offset,
    search,
    sort
  });

  const total = await repository.countAll(search);
  const pages = Math.ceil(total / limit);

  const result = {
    items,
    meta: { page, limit, total, pages }
  };

  // Guardar en cache (60 segundos)
  await redisClient.setEx(cacheKey, 60, JSON.stringify(result));

  console.log("💾 Data from DB and cached");

  return result;
};