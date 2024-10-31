'use strict';
const { Op } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await User.bulkCreate([
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
    {
      id: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
      firstName: 'Sophia',
      lastName: 'Chen',
      username: 'sophiachill',
      email: 'sophia.chill@gmail.com',
      password: bcrypt.hashSync('sophiapassword'),
      bio: `🌻 Hi! I'm Sophia Chen, a nature lover and outdoor adventure enthusiast from Boulder, CO. 🏔️ I'm a landscape photographer, freelance writer, and passionate environmental advocate. I spend most of my time hiking, capturing the beauty of the wilderness, and sharing sustainable living tips. 
            Nature is my happy place, and I'm on a mission to inspire others to explore and protect it. Let's talk conservation or plan our next mountain adventure! 🌲`,
      profilePhoto: '',
    },
    {
      id: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2',
      firstName: 'Liam',
      lastName: 'Martinez',
      username: 'liammartz',
      email: 'liam.martz@yahoo.com',
      password: bcrypt.hashSync('liampassword'),
      bio: `👨‍💻 Hi, I'm Liam Martinez, a software developer and tech enthusiast from Seattle, WA. I specialize in full-stack web development and enjoy exploring new technologies, especially in AI and blockchain. 
            When I'm not coding, you'll probably find me tinkering with gadgets, gaming 🎮, or attending tech meetups. I'm always up for a good conversation about tech and innovation, so feel free to reach out!`,
      profilePhoto: '',
    },
    {
      id: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
      firstName: 'Emma',
      lastName: 'Johnson',
      username: 'emmaexplores',
      email: 'emma.johnson@gmail.com',
      password: bcrypt.hashSync('emmapassword'),
      bio: `✈️ Hey! I'm Emma Johnson, a travel blogger and food lover from Brooklyn, NY. I left my 9-5 job to pursue my passion for discovering new places and cuisines. I've traveled to over 20 countries and love connecting with locals and exploring hidden gems. 
            You can catch me blogging about my adventures, trying out new recipes 🍲, or hunting for the best street food spots. Always open to recommendations or collaborations! Let's share our journeys!`,
      profilePhoto: '',
    },
    {
      id: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6',
      firstName: 'Noah',
      lastName: 'Garcia',
      username: 'noah.g',
      email: 'noah.garcia@outlook.com',
      password: bcrypt.hashSync('noahpassword'),
      bio: `🎸 Hi there! I'm Noah Garcia, a musician and sound engineer based in Nashville, TN. I'm passionate about all things music, from composing and producing to performing live. I play guitar, bass, and a bit of piano, and I’m always experimenting with new sounds.
            Music has the power to bring people together, and I love collaborating with other artists. Let’s make some magic happen in the studio! 🎶`,
      profilePhoto: '',
    },
   ])
  },
  async down (queryInterface, Sequelize) {
    await User.destroy({
      where: {
        [Op.or]: [
          { id: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6' },
          { id: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15' },
          { id: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2' },
          { id: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3' },
          { id: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2' }
        ]
      }
    })
  }
};
