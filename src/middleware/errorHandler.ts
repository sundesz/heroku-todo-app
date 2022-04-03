import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json({ error: error.errors[0].message as string });
    case 'SequelizeValidationError':
      return res.status(400).json({ error: error.errors[0].message as string });
    case 'JsonWebTokenError':
      const message =
        error.message === 'invalid signature'
          ? 'Invalid token'
          : (error.message as string);
      return res.status(401).json({ error: message });
    default:
      return res.status(400).json({ error: error.message as string });
  }
  next(error);
};
