'use strict';

const { Follow } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Follow.bulkCreate([
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'd1b7b5f3-6e4b-49a3-8e32-2b9c3d1f5b12' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'f1a8c3d7-5e2b-4d9a-9e3c-7b1c5e3f4a5b' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'g5e9b3c1-8f1a-4c9e-9b8e-4d5b2f3e7f9d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'h6f7d2e4-5a6c-4b8d-8f3c-3b1e2a8f4c3d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'i8d4e9c3-6b7a-4e5d-9f2c-4d7e6c5f1a8d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'j7a5f3e2-4c1b-4b6d-9f8e-5e6a3c2d4b1c' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'k5d3c1e7-9f8a-4d2e-8c6b-7e1a3f9d6b2c' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'l4e2b1f5-8d7c-4a9e-9f3b-5a7c6e2d3f4c' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'm9e8f2d7-5a3b-4c6d-8f9e-7d1a2c5b4e3f' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'n2a3b7c6-8f1e-4b5d-9c7a-4d5f6e8b9a2d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'o3d4f7e1-5a9b-4c3d-8f5e-7d1c6a9b2f4d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'p5f6c9e4-7a1b-4d2c-9e8b-3d7a4f6b2c5d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'q2e1b5d6-7f9a-4a1b-8c9e-1b8f5c3e4f2d' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'r3f6a9c8-4e1b-4a2d-8b6c-5a1d2f3b4e5f' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 't6b9f5c3-1d2a-4e7b-9f5a-3e2d7c1b4f6e' },
      { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', followedId: 'u1c8e7f4-5a3b-4c5d-8f9e-4e1b2c3f8b2d' },
    ])
  },

  async down (queryInterface, Sequelize) {
    await Follow.destroy({
      where: {
        [Op.or]: [
          { followerId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2' },
        ]
      }
    })
  }
};
