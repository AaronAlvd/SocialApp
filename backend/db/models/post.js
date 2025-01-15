'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        onDelete:'CASCADE',
      })
      Post.hasMany(models.PostLike, {
        as: 'Likes',
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      })
      Post.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      })
    }
  }
  Post.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default',
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
        key: 'id', 
      },
      onDelete: 'CASCADE', 
    },
    caption: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.STRING, 
    },
  }, {
    sequelize,
    modelName: 'Post',
    validate: {
      captionOrPhotoNotBothNull() {
        if (this.caption === null && this.photo === null) {
          throw new Error("Either 'caption' or 'photo' must be provided.");
        }
      }
    }
  });
  return Post;
};