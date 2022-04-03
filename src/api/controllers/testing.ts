import { RequestHandler } from 'express';
import { Task, User } from '../../db/models';

const resetDatabase: RequestHandler = async (_req, res) => {
  await Task.sync({ force: true });
  await User.sync({ force: true });

  res.status(204).end();
};

export default {
  resetDatabase,
};
