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
      Group.hasMany(models.GroupUser, {
        foreignKey: 'groupId',
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
      type: DataTypes.STRING,
    },
    backgroundPhoto: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};