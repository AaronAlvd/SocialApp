'use strict';

const { Chat } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Chat.bulkCreate([
      {
        id: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
        user2Id: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await Chat.destroy({
      where: {
        [Op.or]: [
          { id: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec' }
        ]
      }
    })
  }
};
