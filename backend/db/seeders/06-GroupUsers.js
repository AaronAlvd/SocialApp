'use strict';

const { GroupUser } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupUser.bulkCreate([
      {
        id: '3ca71c29-838a-4e67-9fe9-278232e990a8',
        groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
        role: 'Owner',
      },
      {
        id: 'd13620d6-fbda-4d87-b867-4d0eebe07385',
        groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
        role: 'Admin',
      },
      {
        id: '2b1d75cc-eea5-4a90-b87c-9db0a8311e11',
        groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
        userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2',
        role: 'Member',
      },
      {
        id: '7534f4bc-7b3b-4d2e-8484-df1ceee7e3b3',
        groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
        userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
        role: 'Member',
      },
      
    ])
  },

  async down (queryInterface, Sequelize) {
    await GroupUser.destroy({
      where: {
        [Op.or]: [
          { groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac' }
        ]
      }
    })
  }
};
