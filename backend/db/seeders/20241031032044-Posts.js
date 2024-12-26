'use strict';

const { Op } = require('sequelize');
const { Post } = require('../models')
const fs = require('fs');
const path = require('path');

const readImage = (filePath) => {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve(data); // Return the binary data of the image
          }
      });
  });
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Post.bulkCreate([
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01',
        userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
        caption: `Finally wrapped up my latest project—a minimalist logo design for a local brand. I loved experimenting with clean lines and earthy tones! 🖌️ #DesignLife #Minimalism`,
        photo: await readImage(path.join(__dirname, '../../assets/image01.png'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b02',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
        caption: 'Exploring new horizons with this landscape shot. 🌄 #NaturePhotography',
        photo: await readImage(path.join(__dirname, '../../assets/image02.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b03',
        userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2',
        caption: 'Caught this moment of serenity at the park. 🏞️ #PeacefulVibes',
        photo: await readImage(path.join(__dirname, '../../assets/image03.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b04',
        userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
        caption: 'Sharing a glimpse of my urban exploration journey. 🏙️ #Cityscape',
        photo: await readImage(path.join(__dirname, '../../assets/image04.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b05',
        userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6',
        caption: 'Here’s a throwback to my last beach day. 🏖️ #SunnyTimes',
        photo: await readImage(path.join(__dirname, '../../assets/image05.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b06',
        userId: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9',
        caption: 'Diving into some vibrant street art. 🎨 #ColorSplash',
        photo: await readImage(path.join(__dirname, '../../assets/image06.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b07',
        userId: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e',
        caption: 'Here’s a snapshot from my garden—pure bliss. 🌺 #NatureAtHome',
        photo: await readImage(path.join(__dirname, '../../assets/image07.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b08',
        userId: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56',
        caption: 'A perfect day for hiking! 🌲 #TrailLife',
        photo: await readImage(path.join(__dirname, '../../assets/image08.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b09',
        userId: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13',
        caption: 'This view took my breath away. 🌅 #EveningMagic',
        photo: await readImage(path.join(__dirname, '../../assets/image09.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b10',
        userId: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f',
        caption: 'Capturing the soul of the city through its architecture. 🏛️ #UrbanDreams',
        photo: await readImage(path.join(__dirname, '../../assets/image10.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b11',
        userId: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34',
        caption: 'Couldn’t resist sharing this cute little critter. 🐿️ #WildlifeLove',
        photo: await readImage(path.join(__dirname, '../../assets/image11.jpeg'))
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b12',
        userId: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a',
        caption: 'Morning dew on flowers is just mesmerizing. 🌸 #SimplePleasures',
        photo: await readImage(path.join(__dirname, '../../assets/image12.jpeg'))
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await Post.destroy({
      where: {
        [Op.or]: [
          { userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2' },
          { userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3' },
          { userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2' },
          { userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15' },
          { userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6' },
          { userId: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9' },
          { userId: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e' },
          { userId: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56' },
          { userId: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13' },
          { userId: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f' },
          { userId: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34' },
          { userId: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a' },
          { userId: 'd1b7b5f3-6e4b-49a3-8e32-2b9c3d1f5b12' },
          { userId: 'f1a8c3d7-5e2b-4d9a-9e3c-7b1c5e3f4a5b' },
          { userId: 'g5e9b3c1-8f1a-4c9e-9b8e-4d5b2f3e7f9d' },
          { userId: 'h6f7d2e4-5a6c-4b8d-8f3c-3b1e2a8f4c3d' },
          { userId: 'i8d4e9c3-6b7a-4e5d-9f2c-4d7e6c5f1a8d' },
          { userId: 'j7a5f3e2-4c1b-4b6d-9f8e-5e6a3c2d4b1c' },
          { userId: 'k5d3c1e7-9f8a-4d2e-8c6b-7e1a3f9d6b2c' },
          { userId: 'l4e2b1f5-8d7c-4a9e-9f3b-5a7c6e2d3f4c' },
          { userId: 'm9e8f2d7-5a3b-4c6d-8f9e-7d1a2c5b4e3f' },
          { userId: 'n2a3b7c6-8f1e-4b5d-9c7a-4d5f6e8b9a2d' },
          { userId: 'o3d4f7e1-5a9b-4c3d-8f5e-7d1c6a9b2f4d' },
          { userId: 'p5f6c9e4-7a1b-4d2c-9e8b-3d7a4f6b2c5d' },
          { userId: 'q2e1b5d6-7f9a-4a1b-8c9e-1b8f5c3e4f2d' },
          { userId: 'r3f6a9c8-4e1b-4a2d-8b6c-5a1d2f3b4e5f' },
          { userId: 's4a7b6c1-2e3f-4b8d-9c5a-7c9e1b4f5d1e' },
          { userId: 't6b9f5c3-1d2a-4e7b-9f5a-3e2d7c1b4f6e' },
          { userId: 'u1c8e7f4-5a3b-4c5d-8f9e-4e1b2c3f8b2d' },
          { userId: 'v3b6d2e9-8f1c-4e7b-9d8f-5a2e4c1b3f5e' },
          { userId: 'w2e3b5c4-1d8a-4f2e-9f5c-6d1a2b3f4c5e' },
          { userId: 'x3d8f1c2-5b4a-4d2e-8b6c-3a9e4b1f5c2d' },
          { userId: 'y4c3b2e5-6a1f-4a8d-9c1c-5b3e2d4f5c6e' },
        ]
      }
    })
  }
};
