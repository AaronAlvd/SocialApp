'use strict';

const { Op } = require('sequelize');
const { Comment } = require('../models');

const { comments1 } = require('./seedData/comments_dev/comments1');
const { comments2 } = require('./seedData/comments_dev/comments2');

const allComments = [
  ...comments1,
  ...comments2,
]

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const chunkSize = 500; // Adjust this number based on your DB limits

    for (let i = 0; i < allComments.length; i += chunkSize) {
      const batch = allComments.slice(i, i + chunkSize);
      await Comment.bulkCreate(batch);
    }
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    let allIds = allComments.map(comment => comment.userId)
    
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
