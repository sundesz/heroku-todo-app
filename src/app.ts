import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './api/routers/user';
import taskRouter from './api/routers/task';
import loginRouter from './api/routers/login';
import {
  errorHandler,
  isValidUser,
  tokenExtractor,
  unknownEndpoint,
} from './middleware';
import { JwtPayload } from 'jsonwebtoken';
import { ITaskAttribute } from './db/models';
import testingRouter from './api/routers/testing';
import cookieParser from 'cookie-parser';

/**
 * Custom types for Express Request
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      decodedToken?: string | JwtPayload;
      task?: ITaskAttribute;
    }
  }
}

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5000',
  })
);

app.use(express.json());
app.use(express.static('build'));
app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Sandesh Hyoju - Todo app</h1>');
});

app.get('/health', (_req: Request, res: Response) => {
  res.send('ok');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', tokenExtractor, isValidUser, taskRouter);
app.use('/api/v1/', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
