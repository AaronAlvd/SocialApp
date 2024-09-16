'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Like, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Message, {
        foreignKey: 'senderId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Message, {
        foreignKey: 'receiverId',
        onDelete: 'CASCADE'
      });
      User.belongsToMany(models.User, {
        through: 'Follows',
        as: 'Followers',
        foreignKey: 'FollowerId',
        otherKey: 'FollowedId',
        onDelete: 'CASCADE'
      });
      User.belongsToMany(models.User, {
        through: 'Follows',
        as: 'Following',
        foreignKey: 'FollowedId',
        otherKey: 'FollowerId',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
      validation: {
        len: [60, 60]
      }
    },
    bio: {
      type: DataTypes.TEXT, 
    },
    profilePhoto: {
      type: DataTypes.STRING, 
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['password', 'id', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};