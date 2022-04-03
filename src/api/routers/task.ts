import { Router } from 'express';
import { taskFinder } from '../../middleware/helper';
import taskController from '../controllers/tasks';

const taskRouter = Router();

taskRouter.get('/', taskController.getAllTasks);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:id', taskFinder, taskController.updateTask);
taskRouter.delete('/:id', taskFinder, taskController.deleteTask);

export default taskRouter;
