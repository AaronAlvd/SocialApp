'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: 'senderId',
        onDelete: 'CASCADE',
      });
      Message.belongsTo(models.User, {
        foreignKey: 'receiverId',
        onDelete: 'CASCADE',
      });
    }
  }
  Message.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
      onDelete: 'CASCADE',
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    messageType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chatId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};