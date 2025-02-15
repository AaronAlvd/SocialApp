'use strict';

const { Op } = require('sequelize');
const { Post } = require('../models');

const { posts } = require('./seedData/posts/posts');
const { posts_id } = require('./seedData/posts/posts_id');

const { posts1 } = require('./seedData/posts_dev/posts1');
const { posts2 } = require('./seedData/posts_dev/posts2');
const { posts3 } = require('./seedData/posts_dev/posts3');
const { posts4 } = require('./seedData/posts_dev/posts4');
const { posts5 } = require('./seedData/posts_dev/posts5');



let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const allPosts = [
  ...posts,
  ...posts1,
  ...posts2,
  ...posts3,
  ...posts4,
  ...posts5,
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const chunkSize = 500; // Adjust this number based on your DB limits

    for (let i = 0; i < allPosts.length; i += chunkSize) {
      const batch = allPosts.slice(i, i + chunkSize);
      await Post.bulkCreate(batch);
    }
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    let allIds = allPosts.map((data) => data.id);
    
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
