import * as service from './inventory.service.js';

// CREATE
export const createInventory = async (req, res, next) => {
  try {
    const result = await service.createInventory(req.body, req.user);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateInventory = async (req, res, next) => {
  try {
    const result = await service.updateInventory(
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

// DELETE
export const deleteInventory = async (req, res, next) => {
  try {
    const result = await service.deleteInventory(
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

// GET
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
}, req.user);

    res.json({
      success: true,
      data: result.items,
      meta: result.meta
    });

  } catch (error) {
    next(error);
  }
};