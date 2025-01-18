'use strict';

const { Follow } = require('../models');
const { Op } = require('sequelize');

const { following } = require('./seedData/following/following');
const { user0_id } = require('./seedData/users/id/user0_id');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Follow.bulkCreate([...following])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = [
      ...user0_id.map((user) => user.userId),
    ];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await Follow.destroy({
          where: {
            followerId: {
              [Op.in]: chunk
            }
          }
        });
      }
    };
    
    await deleteInChunks(allIds);
  }
};
