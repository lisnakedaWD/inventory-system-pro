import { logger } from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {

  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl
  });

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message
  });

};