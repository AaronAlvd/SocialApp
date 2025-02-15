'use strict';

const { Follow } = require('../models');
const { Op } = require('sequelize');

const { following1 } = require('./seedData/following_dev/following1');
const { following2 } = require('./seedData/following_dev/following2');

const allFollowing = [
  ...following1,
  ...following2,
]

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Follow.bulkCreate(allFollowing)
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = allFollowing.map(data => data.id)
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await Follow.destroy({
          where: {
            id: {
              [Op.in]: chunk
            }
          }
        });
      }
    };
    
    await deleteInChunks(allIds);
  }
};
