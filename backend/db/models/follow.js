'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.User, {
        as: 'Follower',
        foreignKey: 'followerId',
        onDelete: 'CASCADE'
      });
      Follow.belongsTo(models.User, {
        as: 'Following',
        foreignKey: 'followingId',
        onDelete: 'CASCADE'
      });
    }
  }
  Follow.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    followingId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};