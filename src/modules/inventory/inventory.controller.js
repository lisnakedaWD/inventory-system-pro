import { findAll } from './inventory.repository.js';

export const getInventory = async (req, res) => {
  try {
    const data = await findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};