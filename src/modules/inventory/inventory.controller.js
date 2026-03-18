import { findAll } from './inventory.repository.js';
import { createInventory } from './inventory.service.js';
import { updateInventory } from './inventory.service.js';
import { deleteInventory } from './inventory.service.js';
import * as service from './inventory.service.js';


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

//codigo paginación

export const getInventory = async (req, res, next) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const sort = req.query.sort || 'id';

      const result = await service.getInventory({
      page,
      limit,
      search,
      sort
    });

    res.json({
      success: true,
      data: result.items,
      meta: result.meta
    });

  } catch (error) {
    next(error);
  }
};