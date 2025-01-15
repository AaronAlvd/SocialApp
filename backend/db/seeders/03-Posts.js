'use strict';

const { Op } = require('sequelize');
const { Post } = require('../models')
const { posts01 } = require('./seedData/posts/posts01');
const { posts02 } = require('./seedData/posts/posts02');
const { posts03 } = require('./seedData/posts/posts03');
const { posts04 } = require('./seedData/posts/posts04');
const { posts05 } = require('./seedData/posts/posts05');
const { posts06 } = require('./seedData/posts/posts06');
const { users01_id } = require('./seedData/users/users01');
const { users02_id } = require('./seedData/users/users02');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Post.bulkCreate([...posts01, ...posts02, ...posts03, ...posts04, ...posts05, ...posts06])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;  // Set a reasonable chunk size to avoid exceeding the depth limit

    const allIds = [
      ...users01_id.map(user => user.id),
      ...users02_id.map(user => user.id)
    ];
    
    // Function to delete users in chunks
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);  // Create chunks of IDs
        await Post.destroy({
          where: {
            userId: {
              [Op.in]: chunk  // Use Op.in for each chunk
            }
          }
        });
      }
    };
    
    // Call the function to delete users in chunks
    await deleteInChunks(allIds);
  }
};
