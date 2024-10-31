'use strict';

const { Op } = require('sequelize');
const { Comment } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Comment.bulkCreate([
    {
      id: 'c1e5d1f1-2c0e-4f37-bae0-67e2e8f28a01',
      userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01', // Post by James Hathaway
      comment: `Love this design! The color palette is perfect. 🎨`
    },
    {
      id: 'c2e7f4a2-4c3d-4b67-b5a1-fb89456d72b4',
      userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01', // Post by James Hathaway
      comment: `Amazing work, James! Can’t wait to see more of your projects.`
    },
    {
      id: 'c3f1b3a1-3c8e-4f2c-9a7b-b30a4f16510d',
      userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b02', // Post by Sophia Chen
      comment: `That sounds incredible! I need to get out into nature more.`
    },
    {
      id: 'c4f2e5d8-5fbb-4e03-93b8-5d2a58cc4b8c',
      userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b02', // Post by Sophia Chen
      comment: `Wow! I love the Rockies! They are such a beautiful place.`
    },
    {
      id: 'c5d1a8e5-5f91-4a44-9b8b-1b09ab2f0d9b',
      userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b03', // Post by Liam Martinez
      comment: `I’ve been reading up on that too! It’s an exciting field.`
    },
    {
      id: 'c6d3e9b0-e9bc-4b84-8d05-1b5f9074b750',
      userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b04', // Post by Emma Johnson
      comment: `Yum! Street tacos are the best! I need to visit Mexico City soon!`
    },
    {
      id: 'c7f5c4f2-b68e-45b4-94c0-fc6a1e6d00f7',
      userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b05', // Post by Noah Garcia
      comment: `Sounds awesome, Noah! Can’t wait to hear it!`
    },
    {
      id: 'c8e8d6a7-4bdf-4e53-9a4d-dff1a4a22d74',
      userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
      postId: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b05', // Post by Noah Garcia
      comment: `Let’s get together for a jam session soon! 🎶`
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   await Comment.destroy({
    where: {
      [Op.or]: [
        { userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6' },
        { userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15' },
        { userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2' },
        { userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3' },
        { userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2' }
      ]
    }
   })
  }
};
