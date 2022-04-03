import User from './user';
import Task, { ITaskAttribute } from './task';

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

export { User, Task, ITaskAttribute };
