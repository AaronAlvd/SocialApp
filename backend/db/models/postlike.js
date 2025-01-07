'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostLike.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      PostLike.belongsTo(models.Post, {
        as: 'Likes',
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    }
  }
  PostLike.init({
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
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'PostLike',
  });
  return PostLike;
};