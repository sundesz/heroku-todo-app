import http from 'http';
import app from './app';
import { connectToDatabase } from './db';

import { PORT } from './config';

const server = http.createServer(app);

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
};

void start();
