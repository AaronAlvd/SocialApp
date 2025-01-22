'use strict';

const { GroupUser } = require('../models');
const { Op } = require('sequelize');

const { groupUsers } = require('./seedData/groups/groupUser');
const { groupUsers00 } = require('./seedData/groups/users/users');
const { users_id } = require('./seedData/users/id/user_id');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupUser.bulkCreate([...groupUsers,...groupUsers00]);
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = [
      ...users_id.map((user) => user.userId)
    ];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await GroupUser.destroy({
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
