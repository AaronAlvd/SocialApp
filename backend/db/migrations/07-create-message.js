'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
      },
      chatId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Chats',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};