'use strict';

const { PostLike } = require('../models');
const { Op } = require('sequelize');

const { likes } = require('./seedData/postLikes/likes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await PostLike.bulkCreate([...likes])
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = [
      ...users_id.map((user) => user.userId),
    ];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await PostLike.destroy({
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
