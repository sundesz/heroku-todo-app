import { DataTypes } from 'sequelize';
import { Migration } from '..';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('tasks', 'important', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('tasks', 'important');
};
