'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommentLike.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      CommentLike.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE',
      })
    }
  }
  CommentLike.init({
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
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    commentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Comments',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'CommentLike',
  });
  return CommentLike;
};