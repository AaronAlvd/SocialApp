'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.PostLike, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Message, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.GroupUser, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Chat, {
        as: 'User1',
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Chat, {
        as: 'User2',
        foreignKey: 'user2Id',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Follow, {
        as: 'Follower',
        foreignKey: 'followerId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Follow, {
        as: 'Followed',
        foreignKey: 'followingId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.SearchVault, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.CommentLike, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.FollowingQueue, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.FollowingQueue, {
        foreignKey: 'requestFrom',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(256), 
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(256), 
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 254],
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: [4, 255]
      }
    },
    bio: {
      type: DataTypes.TEXT, 
    },
    profilePhoto: {
      type: DataTypes.STRING,
      defaultValue: null, 
    },
    backgroundPhoto: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['password', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};