import { findAll } from './inventory.repository.js';
import { createInventory } from './inventory.service.js';
import { updateInventory } from './inventory.service.js';
import { deleteInventory } from './inventory.service.js';

export const getInventory = async (req, res) => {
  try {
    const data = await findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//codigo de select
export const create = async (req, res, next) => {
  try {
    const result = await createInventory(req.body);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

//codigo de update
export const update = async (req, res, next) => {
  try {
    const result = await updateInventory(
      req.params.id,
      req.user,
      req.body
    );

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};


//codigo de delete
export const remove = async (req, res, next) => {
  try {
    const result = await deleteInventory(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};