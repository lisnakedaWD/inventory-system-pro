import * as repository from './inventory.repository.js';

export const createInventory = async (data) => {
  if (!data.nombre || !data.serial) {
    throw new Error('Nombre and serial are required');
  }

//codigo de select
  return await repository.create(data, user.tenantId);
};

//codigo de update
export const updateInventory = async (id, user, data) => {

  if (user.role !== 'admin') {
    throw new Error('Only admins can update inventory');
  }

  const affected = await repository.updateById(
    id,
    user.tenantId,
    data
  );

  if (affected === 0) {
    throw new Error('Not found or not allowed');
  }

  return { message: 'Inventory updated successfully' };
};

//codigo de delete
export const deleteInventory = async (id, user) => {

  if (user.role !== 'admin') {
    throw new Error('Only admins can delete inventory');
  }

  const affected = await repository.deleteById(
    id,
    user.tenantId
  );

  if (affected === 0) {
    throw new Error('Not found or not allowed');
  }

  return { message: 'Inventory deleted successfully' };
};