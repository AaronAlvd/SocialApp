'use strict';

const { GroupUser } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupUser.bulkCreate([])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;  // Set a reasonable chunk size to avoid exceeding the depth limit

    const allIds = [];
    
    // Function to delete users in chunks
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);  // Create chunks of IDs
        await GroupUser.destroy({
          where: {
            id: {
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
