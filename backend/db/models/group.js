'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: 'GroupUsers',
        as: 'Groups',
        foreignKey: 'groupId',
        otherKey: 'userId',
        onDelete: 'CASCADE'
      })
      Group.hasMany(models.Post, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      })
    }
  }
  Group.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Public',
    },
    profilePhoto: {
      type: DataTypes.BLOB,
    },
    backgroundPhoto: {
      type: DataTypes.BLOB,
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};