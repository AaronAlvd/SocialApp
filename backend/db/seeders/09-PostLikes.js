'use strict';

const { PostLike } = require('../models');
const { Op } = require('sequelize');

const { likes1 } = require('./seedData/postLikes_dev/likes1');
const { likes2 } = require('./seedData/postLikes_dev/likes2');
const { likes3 } = require('./seedData/postLikes_dev/likes3');
const { likes4 } = require('./seedData/postLikes_dev/likes4');
const { likes5 } = require('./seedData/postLikes_dev/likes5');
const { likes6 } = require('./seedData/postLikes_dev/likes6');
const { likes7 } = require('./seedData/postLikes_dev/likes7');
const { likes8 } = require('./seedData/postLikes_dev/likes8');
const { likes9 } = require('./seedData/postLikes_dev/likes9');
const { likes10 } = require('./seedData/postLikes_dev/likes10');

const allLikes = [
  ...likes1,
  ...likes2,
  ...likes3,
  ...likes4,
  ...likes5,
  ...likes6,
  ...likes7,
  ...likes8,
  ...likes9,
  ...likes10,
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const chunkSize = 500; // Adjust this number based on your DB limits

    for (let i = 0; i < allLikes.length; i += chunkSize) {
      const batch = allLikes.slice(i, i + chunkSize);
      await PostLike.bulkCreate(batch);
    }
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    let allIds = allLikes.map(like => like.userId);
    
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
