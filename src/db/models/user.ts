import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';
import Task from './task';

// defines all the possible attributes of our model
interface IUserAttributes {
  userId: string;
  username: string;
  name: string;
  passwordHash: string;
  createdAt?: Date;
  updateAt?: Date;
  tasks?: Task[];
}

// defines the type of the object passed to Sequelize’s model.create
export type IUserInput = Omit<IUserAttributes, 'userId'>;

class User
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  public userId!: string;
  public username!: string;
  public name!: string;
  public passwordHash!: string;
  public tasks!: [];

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  }
);

export default User;
