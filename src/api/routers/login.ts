import { Router } from 'express';
import { tokenExtractor } from '../../middleware';
import loginController from '../controllers/login';

const loginRouter = Router();

loginRouter.post('/login', loginController.login);
loginRouter.post('/logout', loginController.logout);
loginRouter.post('/refresh', tokenExtractor, loginController.refreshToken);

export default loginRouter;
