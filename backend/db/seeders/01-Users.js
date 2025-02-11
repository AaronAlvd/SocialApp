'use strict';
const { Op } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const { users } = require('./seedData/users/users');
const { users_id } = require('./seedData/users/id/users_id');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli'.Migration)} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await User.bulkCreate([
    ...users,
    {
      id: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin_password',
    }
  ])
  
  },
  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    const allIds = [
      ...users_id.map((user) => user.userId),
      'admin'
    ];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await User.destroy({
          where: {
            id: {
              [Op.in]: chunk
            }
          }
        });
      }
    };
    
    await deleteInChunks(allIds);
  }
};