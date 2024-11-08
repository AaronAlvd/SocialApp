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
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
        caption: `Nothing like a sunrise hike in the Rockies 🏞️. The world feels so different when it's just you, the mountains, and the morning light. #NatureLover #MountainTherapy`,
        photo: null
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b03',
        userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
        caption: `Started a deep dive into blockchain tech. Fascinating to see how this might shape the future of the web! 🚀 #TechTalk #Blockchain`,
        photo: null
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b04',
        userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
        caption: `Just tried the best street tacos in Mexico City! 🌮 If you’re ever here, check out the local food markets. #FoodieAdventures #TasteTheWorld`,
        photo: null
      },
      {
        id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b05',
        userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
        caption: `Recorded a new song with some amazing local artists. So grateful for this creative journey! 🎸🎶 #MusicLife #StudioSession`,
        photo: null
      },
    {
        id: 'p2e2b1f9-8b3d-4b77-9d4e-5c0d1e5c8d2e',
        userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
        caption: `Just had the best street food in Bangkok! Can't wait to share the recipe on my blog. 🍜✈️ #TravelBlogger #Foodie`,
        photo: null
    },
    {
        id: 'p3d3c1a6-7c0b-4c8f-9e6d-9a0b4e6f1e2f',
        userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
        caption: `Excited to be attending a tech conference this weekend! Ready to learn and connect with fellow innovators. 🚀💻 #TechLife #Networking`,
        photo: null
    },
    {
        id: 'p4a5c3d9-2e4b-49b4-8d5f-5a1e3c8f4e1d',
        userId: 'q2e1b5d6-7f9a-4a1b-8c9e-1b8f5c3e4f2d', // Alice Harris
        caption: `Finished a new painting today! Inspired by the vibrant colors of nature. 🌼🎨 Can't wait to show it off! #ArtLife #CreativeJourney`,
        photo: null
    },
    {
        id: 'p5f6e4d8-8b9a-4c1c-8b8e-4f5d8c9e2d3f',
        userId: 's4a7b6c1-2e3f-4b8d-9c5a-7c9e1b4f5d1e', // Mia Young
        caption: `Just completed a DIY project for my living room! Loving how it turned out. 🏠🛠️ #DIY #HomeDecor`,
        photo: null
    },
    {
        id: 'p6g8e1f0-3b3d-4e9b-8e3c-1d6f9c7d3e0d',
        userId: 'u1c8e7f4-5a3b-4c5d-8f9e-4e1b2c3f8b2d', // Lily Green
        caption: `Excited to share my latest article on sustainable living! 🌍💚 Check it out on my blog! #Sustainability #Writing`,
        photo: null
    },
    {
        id: 'p7h2f5e3-8c8b-4b5b-9b2a-3f5a4c6d2d4d',
        userId: 'y4c3b2e5-6a1f-4a8d-9c1c-5b3e2d4f5c6e', // Nora Scott
        caption: `Captured some breathtaking views on my last hike! 🌲📸 Nature truly inspires me every day. #NaturePhotography #HikingAdventures`,
        photo: null
    },
    {
        id: 'p8i7g4b6-2e1a-4c9d-9e5b-6a7d8c3e1b5f',
        userId: 'x3d8f1c2-5b4a-4d2e-8b6c-3a9e4b1f5c2d', // Oliver Adams
        caption: `Just finished a new series of paintings for my upcoming exhibition! 🎉🎨 Can't wait to share them with you all! #ArtExhibition #CreativeProcess`,
        photo: null
    },
    {
        id: 'p9j5e3d1-8f8c-4d0c-9e6d-8b1c7a4f5d2d',
        userId: 'r3f6a9c8-4e1b-4a2d-8b6c-5a1d2f3b4e5f', // Ethan Miller
        caption: `Working on a new app that I’m super excited about! Stay tuned for updates! 📱💡 #ProductDesign #Innovation`,
        photo: null
    },
    {
        id: 'p10k8f4b9-1b7a-4e5d-8e8c-5b3e9c1e2d4d',
        userId: 't6b9f5c3-1d2a-4e7b-9f5a-3e2d7c1b4f6e', // James Taylor
        caption: `Had an amazing jam session with friends last night! Music brings us together! 🎶❤️ #JamSession #MusicFriends`,
        photo: null
    },
    {
        id: 'p11b6c2f-3e8d-4c3e-a7b1-8e4c7d2e3f1d',
        userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
        caption: `Just returned from an incredible hike at Rocky Mountain National Park! The views were breathtaking! 🏞️🌄 #NatureLover #AdventureAwaits`,
        photo: null
     },
     {
         id: 'p12c4d8e-5c3b-4a6e-b8e0-3e5d9f2d7b6e',
         userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
         caption: `Excited to launch my new online portfolio! Check it out and let me know what you think! 🎨💻 #GraphicDesign #PortfolioLaunch`,
         photo: null
     },
     {
         id: 'p13d9a7f-6f1b-4c2b-92d7-8e8a3c4f5e0d',
         userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
         caption: `Just tried a local dish in Vietnam that blew my mind! Can't wait to write about it on my blog! 🍜✈️ #Foodie #TravelBlogger`,
         photo: null
     },
     {
         id: 'p14e8b5c-2e4a-4e9b-b6c7-4b5f9d6e3c1d',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Spent the weekend working on an exciting new project. Can't wait to share it with everyone! 💻🚀 #DeveloperLife #Innovation`,
         photo: null
     },
     {
         id: 'p15f7d1e-8c2d-4f4a-b1b5-3e9a4c2f5b1c',
         userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
         caption: `Just finished recording a new track! Can't wait for you all to hear it! 🎶🎸 #NewMusic #StudioVibes`,
         photo: null
     },
     {
         id: 'p16g5c8f-3f4e-4b7d-a2c8-7e1d5a4f2e3d',
         userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
         caption: `Just returned from a creative retreat in the mountains! Feeling refreshed and inspired! 🏔️✨ #CreativeJourney #NatureInspo`,
         photo: null
     },
     {
         id: 'p17h4a9e-1b9c-4e1b-81f8-9e5e7c3b4a2e',
         userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
         caption: `Planning my next trip and would love your recommendations! Where should I go next? 🌍✈️ #TravelGoals #Wanderlust`,
         photo: null
     },
     {
         id: 'p18i2d3f-8f8a-4c4e-a4f1-6d8a7e5c3c9e',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Join me for a live coding session tomorrow! Let's build something cool together! 💻🎤 #LiveCoding #TechTalk`,
         photo: null
     },
     {
         id: 'p19j7c5e-4b5b-4e6c-8e1f-5c2a4d9f1b6d',
         userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
         caption: `Had a fantastic weekend camping under the stars! Nothing beats nature. ✨🌌 #CampingLife #NatureLover`,
         photo: null
     },
     {
         id: 'p20k3a8d-1e2d-4c6e-b5e9-4f8a3d6c2b5e',
         userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
         caption: `Just launched my music YouTube channel! Come check it out for covers and originals! 🎤📹 #YouTube #MusicJourney`,
         photo: null
     },
     {
      id: 'p21a5c8d-3b1e-4c7b-8c4b-6d8e3c2f5a1e',
      userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
      caption: `Just landed in Tokyo! Can't wait to dive into the culture and cuisine. 🍣🇯🇵 #TravelAdventures #TokyoDiaries`,
      photo: null
     },
     {
         id: 'p22b4e1f-2c7e-4d4b-b9e5-2d9e5f1c3e1f',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Happy to share my latest blog post on the top programming languages to learn in 2024! 📚💻 #Programming #TechTrends`,
         photo: null
     },
     {
         id: 'p23c3f6e-8d2b-4b8b-b5c8-8d6a4f9e3c3e',
         userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
         caption: `Visited a beautiful national park this weekend! Can't get enough of this scenery! 🌲🏕️ #NaturePhotography #WeekendGetaway`,
         photo: null
     },
     {
         id: 'p24d2a9b-6f5a-4b7d-9e4b-1e4c5d3e1b5c',
         userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
         caption: `Just finished an exciting project redesigning a local café's branding! ☕✨ #GraphicDesign #Branding`,
         photo: null
     },
     {
         id: 'p25e1c3f-3a6d-4b9a-b4e4-5a7b6d8e2d1a',
         userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
         caption: `Had an amazing jam session with my band last night! Music is everything! 🎶❤️ #BandLife #MusicInspiration`,
         photo: null
     },
     {
         id: 'p26f9b4d-4c3a-4d2e-b1e7-3b9e8f5c1d2b',
         userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
         caption: `Exploring the street food scene in Ho Chi Minh City! What a culinary adventure! 🍽️🇻🇳 #FoodLover #TravelBlogger`,
         photo: null
     },
     {
         id: 'p27g8c5e-1a9e-4c6b-8c2f-8e3a6d1f5b4d',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Working on a new side project focused on AI! Can't wait to see where it leads! 🤖💡 #AI #SideHustle`,
         photo: null
     },
     {
         id: 'p28h7d6f-3f1a-4e3b-b8c4-1d2c3a4f5e6b',
         userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
         caption: `Feeling inspired by the beauty of the autumn leaves! 🍁🌳 #NatureLover #AutumnVibes`,
         photo: null
     },
     {
         id: 'p29i6e4c-5c8d-4a5a-b8e7-6d8b2a3f1e9a',
         userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
         caption: `Just hit 1,000 subscribers on my music channel! Thank you for the support! 🎉🎤 #Milestone #Grateful`,
         photo: null
     },
     {
         id: 'p30j5f3b-4a3d-4e6e-9d5b-7c3d2a1f5e4b',
         userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
         caption: `Currently working on a new design project that I'm really excited about! Stay tuned! 🎨💻 #CreativeProcess #Design`,
         photo: null
     },
     {
         id: 'p31a4d5f-8c2d-4f1e-9b8c-2f5d3e6b1a5b',
         userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
         caption: `Just wrapped up an incredible week in Kyoto! The temples and gardens were breathtaking! 🌸⛩️ #Japan #TravelDiaries`,
         photo: null
     },
     {
         id: 'p32b3c2e-1d8f-4b5e-a3f3-3c1a4d9f8e6d',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Excited to speak at the upcoming tech conference about web development trends! Hope to see some familiar faces! 🎤💻 #TechConference #SpeakingEngagement`,
         photo: null
     },
     {
         id: 'p33c2f1d-4b6e-42d2-8f5c-6e7c4b1f3a2e',
         userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
         caption: `Caught a stunning sunset on my hike today! Nature never ceases to amaze me. 🌅🌲 #SunsetLover #HikingAdventures`,
         photo: null
     },
     {
         id: 'p34d1e6f-3f3c-4c7b-a2e5-8b3d9e2c6a3d',
         userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
         caption: `Just completed a workshop on digital illustration! Learned so much from amazing artists! 🖌️📚 #Learning #ArtCommunity`,
         photo: null
     },
     {
         id: 'p35e0b8a-2d5e-4f1b-9d3f-4a1c3e4d6e5b',
         userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
         caption: `Had a great time jamming with friends last night! Music truly brings people together! 🎶❤️ #JamSession #Friendship`,
         photo: null
     },
     {
         id: 'p36f8c7b-4c3e-4d4f-a8d1-9e8c1b4e2a3d',
         userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
         caption: `Tasting street food in Bangkok is a must! So many flavors to explore! 🍲🇹🇭 #StreetFood #CulinaryJourney`,
         photo: null
     },
     {
         id: 'p37g7e6f-5c2d-4f6c-b5e9-1d4f3c2e6e4d',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Excited to launch my new coding tutorial series on YouTube! Stay tuned for the first episode! 📹💻 #Coding #YouTube`,
         photo: null
     },
     {
         id: 'p38h6f5d-2c1e-4e7c-b8d6-4e3b1f3e5d1e',
         userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
         caption: `Just finished reading a fantastic book about environmentalism! Feeling inspired to make a difference! 📚🌍 #BookRecommendation #EcoWarrior`,
         photo: null
     },
     {
         id: 'p39i5e4c-1b0f-4f9e-a6c5-5d8e3c7e4e2d',
         userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
         caption: `So excited to announce my first EP drops next month! Can't wait for you all to hear it! 🎉🎤 #NewMusic #EPRelease`,
         photo: null
     },
     {
         id: 'p40j4c3b-3f1e-4b5a-b9c8-3e9d5e8f1c3a',
         userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
         caption: `Spent the weekend sketching at a local art fair! So many talented artists! 🎨❤️ #ArtFair #CreativeInspo`,
         photo: null
     },
     {
         id: 'p41a5d3c-2b4f-4c8a-b6e2-5f3d7e4e1b3d',
         userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
         caption: `Exploring the beautiful streets of Paris! This city never fails to inspire! 🥖🇫🇷 #ParisianVibes #TravelGoals`,
         photo: null
     },
     {
         id: 'p42b6c4e-8f3a-4e5f-9e6b-1c2c3e5d1a7e',
         userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
         caption: `Just wrapped up a coding challenge with friends! Can’t wait to see who wins! 🏆💻 #CodingChallenge #TechFun`,
         photo: null
     },
      {
          id: 'p43c7f5d-1c5e-4e3b-b4f7-8e2f3b4c1d5b',
          userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
          caption: `Had an amazing weekend camping under the stars! The night sky was breathtaking! ✨🌌 #CampingAdventures #NatureLover`,
          photo: null
      },
      {
          id: 'p44d8b6c-9e4f-4c2e-abc8-2c8e3d5b1f6d',
          userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
          caption: `Excited to launch my new portfolio website! Check it out! 🌐🎨 #DesignPortfolio #LaunchDay`,
          photo: null
      },
      {
          id: 'p45e9c7d-3f3e-4a9d-b2d5-4e4e5b8a1a8d',
          userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
          caption: `Just got back from a weekend music festival! What a blast! 🎉🎶 #MusicFestival #GoodVibes`,
          photo: null
      },
      {
          id: 'p46f0d8c-4a5f-4e1e-b3b8-7e1c2a4b3e4d',
          userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
          caption: `Visited an amazing art exhibit today! So much talent on display! 🎨🖼️ #ArtExhibit #Inspiration`,
          photo: null
      },
      {
          id: 'p47g1e9d-5b3e-4e5a-a3d3-1d3b1e8c1c3f',
          userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
          caption: `Spent the day at a tech expo! So many innovative ideas! 🚀💡 #TechExpo #Innovation`,
          photo: null
      },
      {
          id: 'p48h2f0c-6b4d-4c7e-b5e5-2f4e3c7b1f4e',
          userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
          caption: `Just finished a beautiful painting of my favorite hiking spot! 🎨🏞️ #ArtInspiration #Hiking`,
          photo: null
      },
      {
          id: 'p49i3g1d-7c5e-4e8f-a1d6-5f5b2d8c3e5f',
          userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
          caption: `Diving into some new design techniques! Can't wait to share the results! 🎨📈 #DesignLearning #Creativity`,
          photo: null
      },
      {
          id: 'p50j4h2c-8d6f-4a9e-b5b7-6c6f3e9d4c6d',
          userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
          caption: `Just finished recording my latest track! Can't wait for you all to hear it! 🎤🔥 #NewMusic #RecordingSession`,
          photo: null
      },
      {
          id: 'p51k5i3d-9e7f-4f1a-b8d8-3c3e4d7b5d4e',
          userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
          caption: `Taking a cooking class in Italy! Can’t wait to learn how to make authentic pasta! 🍝🇮🇹 #CulinaryAdventure #Travel`,
          photo: null
      },
      {
          id: 'p52l6j4c-0f8e-4f3b-b7d8-4e2e5d9c6e3f',
          userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
          caption: `Excited to build my first mobile app! It's going to be a fun challenge! 📱💻 #MobileDevelopment #Challenge`,
          photo: null
      },
      {
          id: 'p53m7k5d-1g9f-4e4c-a8e9-5f1f6e0c7f4g',
          userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
          caption: `Loving this cozy autumn weather! Perfect for reading and hot drinks! 🍂📚 #CozyVibes #Fall`,
          photo: null
      },
      {
          id: 'p54n8l6c-2h0f-4f5d-b9f8-6g2g7f1d8e5h',
          userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
          caption: `Just designed a new logo for a start-up! Excited to see it in action! 🚀🖌️ #LogoDesign #BrandIdentity`,
          photo: null
      },
      {
          id: 'p55o9m7d-3i1g-4g6f-b1d9-7h3h8g2e9f6i',
          userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
          caption: `Got some great feedback on my last gig! Thankful for all the support! 🙌🎸 #LiveMusic #Gratitude`,
          photo: null
      },
      {
          id: 'p56p0n8c-4j2h-4h7e-b3e0-8i4i9h3f0g7j',
          userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
          caption: `Thrilled to attend a workshop on travel photography! Can’t wait to improve my skills! 📸✈️ #PhotographyWorkshop #Learning`,
          photo: null
      },
      {
          id: 'p57q1o9d-5k3i-4i8f-b4f1-9j5j0i4g1h8k',
          userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
          caption: `Networking with fellow developers at a local meetup! Excited to share ideas! 🤝💬 #TechMeetup #Networking`,
          photo: null
      },
      {
          id: 'p58r2p0c-6l4j-4j9g-a5g2-0k6k1j5h2i9l',
          userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
          caption: `Started a new knitting project! Can’t wait to see how it turns out! 🧶💖 #Knitting #Crafting`,
          photo: null
      },
      {
          id: 'p59s3q1d-7m5k-4k0h-b6h3-1l7l2m8i3j0m',
          userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
          caption: `Diving into the world of UX design! Excited for this new journey! 🌐🎨 #UXDesign #CareerChange`,
          photo: null
      },
      {
          id: 'p60t4r2c-8n6l-4l1i-b7i4-2m8n3o9j4k1n',
          userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
          caption: `Reflecting on an amazing year filled with music and growth! Grateful for every moment! 🎤🌟 #MusicJourney #Reflection`,
          photo: null
      },
      {
          id: 'p61u5s3d-9o7m-4m2j-c8j5-3n9o4p0j5l2o',
          userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
          caption: `Exploring local coffee shops in the city! So many unique flavors to try! ☕️🌆 #CoffeeLover #CityLife`,
          photo: null
      },
      {
          id: 'p62v6t4c-0p8n-4n3k-d9k6-4o0p5q1j6m3p',
          userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
          caption: `Planning my next travel adventure! Suggestions are welcome! 🗺️✈️ #TravelPlanning #Wanderlust`,
          photo: null
      },
      {
          id: 'p63w7u5d-1q9o-4o4l-e1l7-5p1q6r2n7k4q',
          userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
          caption: `Just finished a marathon of my favorite series! So worth it! 🍿🎬 #BingeWatching #TVTime`,
          photo: null
      },
      {
          id: 'p64x8v6c-2r0p-4p5m-f2m8-6q3r7s3o8l5r',
          userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
          caption: `Had a fantastic day volunteering at the local shelter! Giving back feels amazing! 👐❤️ #Volunteering #Community`,
          photo: null
      },
      {
          id: 'p65y9w7d-3s1q-4q6n-g3n9-7r8s8t5p9m6s',
          userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
          caption: `So stoked to be featured in a local magazine! Grateful for the recognition! 🎉📖 #Feature #Gratitude`,
          photo: null
      },
      {
          id: 'p66z0x8c-4t2r-4r7o-h4o0-8s1t9u6q0n7t',
          userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15', // Emma Johnson
          caption: `Excited for the upcoming art festival! Can't wait to see everyone's work! 🎨🎉 #ArtFestival #Creativity`,
          photo: null
      },
      {
          id: 'p67a1y9d-5u3s-4s8p-i5p1-9t2u0v7r1o8u',
          userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2', // Liam Martinez
          caption: `Joining a new gaming community! Excited to meet fellow gamers! 🎮👾 #GamingCommunity #FunTimes`,
          photo: null
      },
      {
          id: 'p68b2z0c-6v4t-4t9q-j6q2-0u3v1w8s2p9v',
          userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3', // Sophia Chen
          caption: `Thrilled to attend a concert this weekend! Music is life! 🎶❤️ #ConcertLife #LiveMusic`,
          photo: null
      },
      {
          id: 'p69c3a1d-7w5u-4u0r-k7r3-1v4w2x9t3q0w',
          userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
          caption: `Exploring the city on my bike! It's a beautiful day! 🚴‍♂️☀️ #Biking #OutdoorAdventures`,
          photo: null
      },
      {
          id: 'p70d4b2c-8x6v-4v1s-l8s4-2w5x3y0u4r1x',
          userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6', // Noah Garcia
          caption: `Finished writing a new song! Can't wait to perform it live! 🎸✨ #Songwriting #NewMusic`,
          photo: null
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
