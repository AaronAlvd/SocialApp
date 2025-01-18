'use strict';

const { Op } = require('sequelize');
const { Post } = require('../models')

const { posts0 } = require('./seedData/posts/posts0');
const { user0_id } = require('./seedData/users/id/user0_id')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Post.bulkCreate([...posts0])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = [
      ...user0_id.map((user) => user.userId),
    ];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await Post.destroy({
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
