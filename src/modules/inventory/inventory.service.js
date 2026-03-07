import * as repository from './inventory.repository.js';

export const createInventory = async (data) => {
  if (!data.nombre || !data.serial) {
    throw new Error('Nombre and serial are required');
  }

  return await repository.create(data);
};