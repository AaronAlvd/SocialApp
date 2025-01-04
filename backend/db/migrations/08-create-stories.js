'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      storyImage: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
      storyText: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stories');
  }
};