'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUser extends Model {
    static associate(models) {
      GroupUser.belongsTo(models.User, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
      })
    }
  }
  GroupUser.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    groupId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Groups',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return GroupUser;
};