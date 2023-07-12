import { Express } from 'express';
import usersRouter from './users/usersRouter';

const routes = (server: Express) => {
  server.use('/users', usersRouter);
};

export default routes;
