'use strict';

const { PostLike } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await PostLike.bulkCreate([
      {
        "id": "a8a596a4-dd3e-4d36-9a77-111e38ccdc0e",
        "userId": "a1fbc967-1fae-467e-8b56-98b6e7d19df3",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "d25c4e88-4254-41b7-832c-a5e35de2c556",
        "userId": "d4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "78450b08-b3f0-4706-b4dc-af400ebc1752",
        "userId": "f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "fdf56267-f258-4405-9724-6ffbd5f1b36d",
        "userId": "b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "2e5d6e1b-1127-47c1-9823-8d7f759927cc",
        "userId": "c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "b458de4a-7c76-4a3a-89e7-75b9a62741c1",
        "userId": "e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "d0e38f56-6f49-4419-97ea-47c6ac7b2a51",
        "userId": "d6f12a4e-549b-42c9-8a8e-47f4c6aefc56",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "0c8c38ad-6e97-496e-8149-96f4f9c14e8e",
        "userId": "a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "476b9b82-e9f0-4db6-a08d-8d2eaa7e1125",
        "userId": "f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "47b2d108-3264-4cbb-b2b3-80248af04a76",
        "userId": "c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "77cd9f76-59e2-41e5-8a5d-019a7b8f325e",
        "userId": "b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "dcfca84d-1a1d-4f5b-8e26-f7462a17517b",
        "userId": "d1b7b5f3-6e4b-49a3-8e32-2b9c3d1f5b12",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "c487a921-5ee6-4e33-8161-d432a9c361fa",
        "userId": "f1a8c3d7-5e2b-4d9a-9e3c-7b1c5e3f4a5b",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "689476f6-107d-4a57-baa2-4e016e98fc6d",
        "userId": "g5e9b3c1-8f1a-4c9e-9b8e-4d5b2f3e7f9d",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      },
      {
        "id": "b17ab7d1-01ec-4cf2-b0fc-6e3ad8a3d8ba",
        "userId": "h6f7d2e4-5a6c-4b8d-8f3c-3b1e2a8f4c3d",
        "postId": "p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await PostLike.destroy({
      where: {
        [Op.or]: [
          { userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3' },
          { userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2' },
          { userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15' },
          { userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6' },
          { userId: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9' },
          { userId: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e' },
          { userId: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56' },
          { userId: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13' },
          { userId: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f' },
          { userId: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34' },
          { userId: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a' },
          { userId: 'd1b7b5f3-6e4b-49a3-8e32-2b9c3d1f5b12' },
          { userId: 'f1a8c3d7-5e2b-4d9a-9e3c-7b1c5e3f4a5b' },
          { userId: 'g5e9b3c1-8f1a-4c9e-9b8e-4d5b2f3e7f9d' },
          { userId: 'h6f7d2e4-5a6c-4b8d-8f3c-3b1e2a8f4c3d' },
        ]
      }
    })
  }
};
