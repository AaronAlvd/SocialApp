'use strict';

const { Message } = require('../models');
const { Op } = require('sequelize');

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
    ])
  },

  async down (queryInterface, Sequelize) {
    await Message.destroy({
      where: {
        [Op.or]: [
          { chatId: '58ba7c0d-d6f9-4bcb-9241-adebb7dae9ec'}
        ]
      }
    })
  }
};
