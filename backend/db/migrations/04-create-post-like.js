'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostLikes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postId: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('PostLikes');
  }
};