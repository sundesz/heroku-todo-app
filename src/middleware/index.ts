import { RequestHandler } from 'express';
import { errorHandler } from './errorHandler';
import { tokenExtractor, isValidUser } from './helper';

const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Unknown Endpoint ${req.originalUrl}` });
};

export { errorHandler, unknownEndpoint, tokenExtractor, isValidUser };
