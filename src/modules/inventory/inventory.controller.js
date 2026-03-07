import { findAll } from './inventory.repository.js';
import { createInventory } from './inventory.service.js';

export const getInventory = async (req, res) => {
  try {
    const data = await findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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