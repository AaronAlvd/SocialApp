'use strict';

const { Op } = require('sequelize');
const { Comment } = require('../models');
const { comments01 } = require('./seedData/comments/comments01');
const { users01_id } = require('./seedData/users/users01');
const { users02_id } = require('./seedData/users/users02');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Comment.bulkCreate([...comments01])
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
        await Comment.destroy({
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
