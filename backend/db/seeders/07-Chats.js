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
    await Chat.bulkCreate([])
  },

  async down (queryInterface, Sequelize) {
    await Chat.destroy({
      where: {
        id: '1'
      }
    })
  }
};
