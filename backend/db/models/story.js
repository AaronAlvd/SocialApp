'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Story.init({
    storyImage: {
      allowNull: false,
      type: DataTypes.BLOB,
    },
    storyText: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};