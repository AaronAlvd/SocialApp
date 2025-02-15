'use strict';
const { Op } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const { users } = require('./seedData/users/users');
const { users_id } = require('./seedData/users/id/users_id');

const { users1 } = require('./seedData/users_dev/users1');
const { users2 } = require('./seedData/users_dev/users2');
const { users3 } = require('./seedData/users_dev/users3');
const { users4 } = require('./seedData/users_dev/users4');
const { users5 } = require('./seedData/users_dev/users5');
const { users6 } = require('./seedData/users_dev/users6');
const { users7 } = require('./seedData/users_dev/users7');
const { users8 } = require('./seedData/users_dev/users8');
const { users9 } = require('./seedData/users_dev/users9');
const { users10 } = require('./seedData/users_dev/users10');

const allUsers = [
  ...users,
  ...users1,
  ...users2,
  ...users3,
  ...users4,
  ...users5,
  ...users6,
  ...users7,
  ...users8,
  ...users9,
  ...users10,
  {
    id: 'admin',
    firstName: 'admin',
    lastName: 'admin',
    username: 'admin',
    email: 'admin@admin.com',
    password: 'admin_password',
  }
]

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli'.Migration)} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const chunkSize = 500; // Adjust this number based on your DB limits

    for (let i = 0; i < allUsers.length; i += chunkSize) {
      const batch = allUsers.slice(i, i + chunkSize);
      await User.bulkCreate(batch);
    }
  },
  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;

    let allIds = [
      ...allUsers.map((user) => user.id),
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