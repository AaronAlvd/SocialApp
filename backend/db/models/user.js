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
      // define association here
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
        len: [4, 254]
      }
    },
    password: {
      type: DataTypes.STRING.BINARY, 
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
  });
  return User;
};