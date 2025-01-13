'use strict';

const { Group } = require('../models')
const { Op } = require('sequelize');
const group = require('../models/group');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        id: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
        groupName: 'TheFirstGroup',
        status: 'Private',
        profilePhoto: null,
        backgroundPhoto: null,
        bio: `We are a passionate and innovative team of designers, developers, and creatives dedicated to crafting unique digital experiences. With a shared vision of blending functionality with creativity, we specialize in designing cutting-edge websites, apps, and digital solutions that not only look amazing but also perform seamlessly.
        Our team is built on a foundation of collaboration, where diverse skills and perspectives come together to solve problems and push the boundaries of what's possible in the digital space. Whether it’s designing a visually stunning website or developing an intuitive user experience, we believe that great design is both an art and a science.  
        With a focus on user-centered design, we aim to create digital experiences that resonate with audiences, enhance engagement, and drive results. From startups to established brands, we’re here to bring your vision to life with innovative, tailored solutions that stand out in a crowded digital world.`,
      },
      {
        id: 'default',
        groupName: 'default',
        status: 'Public',
        profilePhoto: null,
        backgroundPhoto: null,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await Group.destroy({
      where: {
        [Op.or]: [
          { id: 'acd44161-0ce5-44c3-8bb6-b0e983857aac' },
          { id: 'default' }
        ]
      }
    })
  }
};
