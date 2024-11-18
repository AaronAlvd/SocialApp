'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  }
  Group.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
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
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member'
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};