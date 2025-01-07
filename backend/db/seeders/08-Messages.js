'use strict';

const { Message } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Message.bulkCreate([
      {
        id: 'e9e10579-705d-4ae8-9382-725a080191cb',
        chatId: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
        content: 'Did you know that octopuses have three hearts, and two of them stop beating when they swim? Imagine the multitasking capabilities!',
      },
      {
        id: '687bf6c8-cb36-4424-8200-4d01959dbaff',
        chatId: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
        content: "Hey, did you see Messi's goal last night? Absolute magic! He's still out there proving why he's the GOAT. We should catch a game soon!",
      },
      {
        id: '6549032e-5c0c-4181-8562-3b13a944b4e5',
        chatId: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
        content: "Bro, I can't believe how intense that match was! 3-3 with a last-minute equalizer—my heart can't take it. Who do you think is taking the league this season?",
      },
      {
        id: '09dbe8bc-56b4-41ab-84c7-d4f9b7e1c6a2',
        chatId: '2f0e7949-5c4c-4a00-8f5f-69c58ef29007',
        userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2',
        content: "Hi! I'm doing well, thanks for asking. How about you? Let's catch up soon!",
      },
      {
        id: 'f23a6db3-435f-4f42-a6c7-9214d6b8d1c2',
        chatId: 'c5ec16bd-b37e-49f9-849a-8ee4f6758d37',
        userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
        content: "Hey! Just wanted to check in and see how you're doing. Let me know if you're free to chat sometime",
      },
      {
        id: '47c912e5-95e4-4d3f-b3d9-123f7dbe19c8',
        chatId: 'ed0519a7-95d1-41aa-8a2b-a0c7fb27bde9',
        userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6',
        content: "Good morning! Just a quick reminder about our meeting later today. Let me know if you need anything prepared beforehand.",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await Message.destroy({
      where: {
        [Op.or]: [
          { chatId: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec' },
          { chatId: '2f0e7949-5c4c-4a00-8f5f-69c58ef29007' },
          { chatId: 'c5ec16bd-b37e-49f9-849a-8ee4f6758d37' },
          { chatId: 'ed0519a7-95d1-41aa-8a2b-a0c7fb27bde9' },
        ]
      }
    })
  }
};
