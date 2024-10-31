'use strict';

const { Op } = require('sequelize');
const { Post } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Post.bulkCreate([
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
        caption: `Finally wrapped up my latest project—a minimalist logo design for a local brand. I loved experimenting with clean lines and earthy tones! 🖌️ #DesignLife #Minimalism`,
        photo: ''
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b02',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
        caption: `Nothing like a sunrise hike in the Rockies 🏞️. The world feels so different when it's just you, the mountains, and the morning light. #NatureLover #MountainTherapy`,
        photo: ''
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b03',
        userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
        caption: `Started a deep dive into blockchain tech. Fascinating to see how this might shape the future of the web! 🚀 #TechTalk #Blockchain`,
        photo: ''
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b04',
        userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
        caption: `Just tried the best street tacos in Mexico City! 🌮 If you’re ever here, check out the local food markets. #FoodieAdventures #TasteTheWorld`,
        photo: ''
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b05',
        userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
        caption: `Recorded a new song with some amazing local artists. So grateful for this creative journey! 🎸🎶 #MusicLife #StudioSession`,
        photo: ''
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await Post.destroy({
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
