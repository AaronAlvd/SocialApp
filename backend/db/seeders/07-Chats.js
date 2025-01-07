'use strict';

const { Chat } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Chat.bulkCreate([
      {
        id: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
        user2Id: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
      },
      {
        id: '2f0e7949-5c4c-4a00-8f5f-69c58ef29007',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
        user2Id: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2',
      },
      {
        id: 'c5ec16bd-b37e-49f9-849a-8ee4f6758d37',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
        user2Id: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
      },
      {
        id: 'ed0519a7-95d1-41aa-8a2b-a0c7fb27bde9',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
        user2Id: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6',
      },
      // {
      //   id: '316fdb55-bf81-49b6-8880-061f0186ae12',
      //   userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
      //   user2Id: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9',
      // }
    ])
  },

  async down (queryInterface, Sequelize) {
    await Chat.destroy({
      where: {
        [Op.or]: [
          { id: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec' },
          { id: '2f0e7949-5c4c-4a00-8f5f-69c58ef29007' },
          { id: 'c5ec16bd-b37e-49f9-849a-8ee4f6758d37' },
          { id: 'ed0519a7-95d1-41aa-8a2b-a0c7fb27bde9' },
          { id: '316fdb55-bf81-49b6-8880-061f0186ae12' },
        ]
      }
    })
  }
};
