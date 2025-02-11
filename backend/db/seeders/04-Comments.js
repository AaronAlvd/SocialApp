'use strict';

const { Op } = require('sequelize');
const { Comment } = require('../models');

const { comments1 } = require('./seedData/comments/comments1');
const { user0_id } = require('./seedData/users/id/user0_id')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Comment.bulkCreate([])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = [
      ...user0_id.map((user) => user.userId),
    ];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await Comment.destroy({
          where: {
            userId: {
              [Op.in]: chunk
            }
          }
        });
      }
    };
    
    await deleteInChunks(allIds);
  }
};
