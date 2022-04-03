import { Router } from 'express';
import testingController from '../controllers/testing';

const testingRouter = Router();

testingRouter.post('/reset', testingController.resetDatabase);

export default testingRouter;
