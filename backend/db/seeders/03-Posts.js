'use strict';

const { Op } = require('sequelize');
const { Post } = require('../models');

const { posts } = require('./seedData/posts/posts');
const { posts_id } = require('./seedData/posts/posts_id');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Post.bulkCreate([...posts])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = posts_id.map((data) => data.postId);
    
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
