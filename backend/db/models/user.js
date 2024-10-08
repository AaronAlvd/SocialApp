'use strict';
const {
  Model
} = require('sequelize');
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
    firstName: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    profilePhoto: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};