import { Router } from 'express';
import userController from '../controllers/users';
const userRouter = Router();

userRouter.post('/', userController.createUser);

export default userRouter;
