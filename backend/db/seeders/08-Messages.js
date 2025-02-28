'use strict';

const { Message } = require('../models');
const { Op } = require('sequelize');

const { messages } = require('./seedData/messages/messages')

const { users } = require('./seedData/users/users');
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
]

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Message.bulkCreate(messages)
  },

  async down (queryInterface, Sequelize) {
    const chunkSize = 1000;
        
    let allIds = [...allUsers.map((user) => user.id)];
    
    const deleteInChunks = async (ids) => {
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        await Message.destroy({
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
