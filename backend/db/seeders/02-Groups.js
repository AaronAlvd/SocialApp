'use strict';

const { Group } = require('../models')
const { Op } = require('sequelize');
const group = require('../models/group');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        id: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
        groupName: 'TheFirstGroup',
        status: 'Private',
        profilePhoto: null,
        backgroundPhoto: null,
      },
      {
        id: 'default',
        groupName: 'default',
        status: 'Public',
        profilePhoto: null,
        backgroundPhoto: null,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await Group.destroy({
      where: {
        [Op.or]: [
          { id: 'acd44161-0ce5-44c3-8bb6-b0e983857aac' },
        ]
      }
    })
  }
};
