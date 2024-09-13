'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
      Like.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE',
      });
    }
  }
  Like.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
      onDelete: 'CASCADE',
    },
    postId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Posts',
        key: 'id',
      }
    },
    commentId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Comments',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};