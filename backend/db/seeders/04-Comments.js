'use strict';

const { Op } = require('sequelize');
const { Comment } = require('../models');
const { comments1 } = require('./seedData/comments/comments1');
const { comments2 } = require('./seedData/comments/comments2');
const { comments3 } = require('./seedData/comments/comments3');
const { comments4 } = require('./seedData/comments/comments4');
const { comments5 } = require('./seedData/comments/comments5');
const { comments6 } = require('./seedData/comments/comments6');
const { comments7 } = require('./seedData/comments/comments7');
const { comments8 } = require('./seedData/comments/comments8');
const { comments9 } = require('./seedData/comments/comments9');
const { comments10 } = require('./seedData/comments/comments10');
const { comments11 } = require('./seedData/comments/comments11');
const { comments12 } = require('./seedData/comments/comments12');
const { comments13 } = require('./seedData/comments/comments13');
const { comments14 } = require('./seedData/comments/comments14');
const { comments15 } = require('./seedData/comments/comments15');
const { comments16 } = require('./seedData/comments/comments16');
const { comments17 } = require('./seedData/comments/comments17');
const { comments18 } = require('./seedData/comments/comments18');
const { comments19 } = require('./seedData/comments/comments19');
const { comments20 } = require('./seedData/comments/comments20');


const { users01_id } = require('./seedData/users/users01');
const { users02_id } = require('./seedData/users/users02');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Comment.bulkCreate([
    ...comments1, 
    ...comments2,
    ...comments3, 
    ...comments4,
    ...comments5, 
    ...comments6,
    ...comments7, 
    ...comments8,
    ...comments9, 
    ...comments10,
    ...comments11, 
    ...comments12,
    ...comments13, 
    ...comments14,
    ...comments15, 
    ...comments16,
    ...comments17, 
    ...comments18,
    ...comments19, 
    ...comments20,
  ])
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
