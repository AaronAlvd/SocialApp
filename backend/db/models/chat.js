'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User, {
        as: 'User1',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Chat.belongsTo(models.User, {
        as: 'User2',
        foreignKey: 'user2Id',
        onDelete: 'CASCADE',
      });
      Chat.hasMany(models.Message, {
        foreignKey: 'chatId',
        onDelete: 'CASCADE',
      });
    }
  }
  Chat.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
    user2Id: {
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
    modelName: 'Chat',
  });
  return Chat;
};