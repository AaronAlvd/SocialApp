'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await User.BulkCreate([
    {
      id: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
      firstName: 'James',
      lastName: 'Hathaway',
      username: 'jameshathaway',
      email: 'jamesthegoat@icloud.com',
      password: bcrypt.hashSync('password'),
      bio: `👋 Hey there! I'm Jamie Peterson—a digital nomad 🌏 and creative enthusiast based in Austin, TX! I’m a graphic designer, part-time photographer 📸, and full-time traveler. After leaving my corporate gig in 2020, I packed my bags and have since been working remotely, exploring new places, and connecting with inspiring creatives worldwide 🌐.
            I’m passionate about minimalist design 🖌️, ethical fashion 👕, and sharing eco-conscious living tips. You’ll find me sipping on artisanal coffee ☕, capturing candid city moments, or planning my next adventure into nature 🌲.
            Always open to collabs, especially if they involve cool visuals or meaningful projects. Let’s make something awesome together! ✌️`,
      profilePhoto: '',
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    
  }
};
