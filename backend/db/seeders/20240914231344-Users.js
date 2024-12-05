'use strict';
const { Op } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
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
      profilePhoto: await readImage(path.join(__dirname, '../../assets/image01.png')),
      backgroundPhoto: await readImage(path.join(__dirname, '../../assets/image02.jpeg')),
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
      profilePhoto: null,
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
      profilePhoto: null,
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
      profilePhoto: null,
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
      profilePhoto: null,
    },
    {
      id: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9',
      firstName: 'Olivia',
      lastName: 'Turner',
      username: 'oliviartsy',
      email: 'olivia.turner@gmail.com',
      password: bcrypt.hashSync('oliviaturnerpassword'),
      bio: `🎨 Hello! I'm Olivia Turner, a painter and art teacher from San Francisco, CA. My work is inspired by nature and abstract art. I believe in the power of creativity and often hold workshops to help people unleash their artistic side. 
            When I'm not painting, you can find me exploring local galleries, hiking, or experimenting with new painting techniques. Let's bring more color into the world! 🌈`,
      profilePhoto: null,
    },
    {
      id: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e',
      firstName: 'Ava',
      lastName: 'Wilson',
      username: 'avaadventurous',
      email: 'ava.wilson@gmail.com',
      password: bcrypt.hashSync('avaadventure'),
      bio: `🏕️ Hi! I'm Ava Wilson, an outdoor educator and wildlife enthusiast based in Portland, OR. I run wilderness survival courses and love teaching people about nature. I'm passionate about conservation, animal tracking, and creating awareness about sustainable practices.
            Let’s connect if you’re interested in hiking, camping, or learning more about wilderness skills! 🌲`,
      profilePhoto: null,
    },
    {
      id: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56',
      firstName: 'Ethan',
      lastName: 'Smith',
      username: 'ethanspeaks',
      email: 'ethan.smith@outlook.com',
      password: bcrypt.hashSync('ethanpassword'),
      bio: `🎤 Hey there! I'm Ethan Smith, a motivational speaker and personal development coach from Chicago, IL. My passion lies in helping people realize their full potential. I host workshops on building confidence, leadership, and effective communication.
            When I'm not speaking or coaching, I'm reading books, meditating, or practicing mindfulness. Let’s connect and make positive changes together! ✨`,
      profilePhoto: null,
    },
    {
      id: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13',
      firstName: 'Mia',
      lastName: 'Davis',
      username: 'miadfit',
      email: 'mia.davis@gmail.com',
      password: bcrypt.hashSync('miadfitness'),
      bio: `💪 Hi! I'm Mia Davis, a fitness trainer and health coach based in Miami, FL. My goal is to inspire people to live healthier and happier lives through physical activity and balanced nutrition. I share workout tips, meal plans, and motivational content.
            Whether you’re just starting your fitness journey or looking for new challenges, let’s connect and work toward your goals together! 🌟`,
      profilePhoto: null,
    },
    {
      id: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f',
      firstName: 'Jackson',
      lastName: 'Nguyen',
      username: 'jacksontunes',
      email: 'jackson.nguyen@gmail.com',
      password: bcrypt.hashSync('jacksonpassword'),
      bio: `🎧 Hi, I’m Jackson Nguyen, a DJ and music producer from Los Angeles, CA. I specialize in EDM and hip-hop beats, and love mixing tracks that get people on the dance floor. Music is my life, and I’m always on the lookout for new sounds and collaborations.
            Let’s connect if you’re into music production or just want to vibe out! 🎶`,
      profilePhoto: null,
    },
    {
      id: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34',
      firstName: 'Ella',
      lastName: 'Moore',
      username: 'ellawrites',
      email: 'ella.moore@gmail.com',
      password: bcrypt.hashSync('ellamoorepassword'),
      bio: `✍️ Hello! I’m Ella Moore, a freelance writer and novelist from Boston, MA. I write about self-growth, mental health, and storytelling. My mission is to create stories that inspire others. I'm also working on my first novel! 
            Let’s connect if you love books, writing, or have ideas to share! 📖`,
      profilePhoto: null,
    },
    {
      id: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a',
      firstName: 'Lucas',
      lastName: 'Brooks',
      username: 'lucasbro',
      email: 'lucas.brooks@gmail.com',
      password: bcrypt.hashSync('lucasbrooks'),
      bio: `⚽ Hey! I’m Lucas Brooks, a sports coach and fitness enthusiast from Denver, CO. I specialize in soccer coaching for young athletes and love helping people reach their fitness goals. When I'm not coaching, you’ll find me watching matches or hiking.
            Always open to connecting with fellow sports lovers and sharing training tips! 🏃`,
      profilePhoto: null,
    },
    {
      id: 'd1b7b5f3-6e4b-49a3-8e32-2b9c3d1f5b12',
      firstName: 'Amelia',
      lastName: 'King',
      username: 'ameliakings',
      email: 'amelia.king@gmail.com',
      password: bcrypt.hashSync('ameliapassword'),
      bio: `🎬 Hi! I'm Amelia King, a filmmaker and storyteller from Austin, TX. My passion is creating meaningful documentaries and films that bring awareness to social issues. I’m inspired by real stories and love collaborating with other creatives.
            Let's connect if you're into filmmaking, storytelling, or creative projects! 📹`,
      profilePhoto: null,
    },
    {
      id: 'f1a8c3d7-5e2b-4d9a-9e3c-7b1c5e3f4a5b',
      firstName: 'Henry',
      lastName: 'Young',
      username: 'henrycoding',
      email: 'henry.young@devmail.com',
      password: bcrypt.hashSync('henrypassword'),
      bio: `👨‍💻 Hi, I'm Henry Young, a software engineer from Boston, MA. I work in front-end development and love creating user-friendly interfaces. I'm passionate about UI/UX design and constantly learning about new trends in tech.
            Reach out if you want to talk code or collaborate on a project! 💻`,
      profilePhoto: null,
    },
    {
      id: 'g5e9b3c1-8f1a-4c9e-9b8e-4d5b2f3e7f9d',
      firstName: 'Grace',
      lastName: 'Thompson',
      username: 'graceinspired',
      email: 'grace.thompson@gmail.com',
      password: bcrypt.hashSync('gracepassword'),
      bio: `🧘‍♀️ Hi! I'm Grace Thompson, a yoga instructor and mindfulness coach from Sedona, AZ. I teach yoga and meditation, focusing on personal growth and healing. I love helping people find inner peace and live more balanced lives.
            Let’s connect if you're interested in wellness, meditation, or mindfulness practices! 🌼`,
      profilePhoto: null,
    },
    {
      id: 'h6f7d2e4-5a6c-4b8d-8f3c-3b1e2a8f4c3d',
      firstName: 'Benjamin',
      lastName: 'Lopez',
      username: 'benjitech',
      email: 'benjamin.lopez@techmail.com',
      password: bcrypt.hashSync('benjaminpassword'),
      bio: `🚀 Hello! I'm Benjamin Lopez, a data scientist and AI enthusiast from New York, NY. My work revolves around machine learning and big data, and I’m fascinated by how data shapes the future. 
            When I’m not coding, I enjoy reading about space exploration and innovations. Reach out if you want to chat AI or collaborate on a project! 📊`,
      profilePhoto: null,
    },
    {
      id: 'i8d4e9c3-6b7a-4e5d-9f2c-4d7e6c5f1a8d',
      firstName: 'Natalie',
      lastName: 'Brooks',
      username: 'natalieb',
      email: 'natalie.brooks@writer.com',
      password: bcrypt.hashSync('nataliebpassword'),
      bio: `📚 Hey! I'm Natalie Brooks, a writer and poet from Atlanta, GA. I write about love, life, and the world around us. I believe in the power of words to heal and inspire. 
            When I'm not writing, you’ll find me exploring local coffee shops or reading. Connect with me if you’re a fellow book lover or writer! ✍️`,
      profilePhoto: null,
    },
    {
      id: 'j7a5f3e2-4c1b-4b6d-9f8e-5e6a3c2d4b1c',
      firstName: 'Evelyn',
      lastName: 'Morris',
      username: 'evelynarts',
      email: 'evelyn.morris@artmail.com',
      password: bcrypt.hashSync('evelynpassword'),
      bio: `🎨 Hello! I’m Evelyn Morris, a freelance illustrator from Austin, TX. My work is inspired by nature and surrealism. I’m passionate about creating art that tells stories and evokes emotion.
            Let’s connect if you’re an art lover or creative, or if you have a project in mind! 🌸`,
      profilePhoto: null,
    },
    {
      id: 'k5d3c1e7-9f8a-4d2e-8c6b-7e1a3f9d6b2c',
      firstName: 'Owen',
      lastName: 'Parker',
      username: 'owenexplores',
      email: 'owen.parker@traveller.com',
      password: bcrypt.hashSync('owenpassword'),
      bio: `🌍 Hi! I’m Owen Parker, a travel photographer and videographer based in San Diego, CA. I specialize in capturing landscapes and cityscapes from around the world. 
            I’m always up for an adventure and love meeting new people along the way. Let’s connect if you want to share travel stories or collaborate! ✈️`,
      profilePhoto: null,
    },
    {
      id: 'l4e2b1f5-8d7c-4a9e-9f3b-5a7c6e2d3f4c',
      firstName: 'Chloe',
      lastName: 'Reed',
      username: 'chloereads',
      email: 'chloe.reed@bibliophile.com',
      password: bcrypt.hashSync('chloepassword'),
      bio: `📖 Hello! I'm Chloe Reed, a librarian and book blogger from Philadelphia, PA. My life revolves around books, from classics to contemporary fiction. I run a book club and blog where I share reviews and reading recommendations.
            If you're a bookworm too, let’s connect! 📚`,
      profilePhoto: null,
    },
    {
      id: 'm9e8f2d7-5a3b-4c6d-8f9e-7d1a2c5b4e3f',
      firstName: 'Leo',
      lastName: 'Clark',
      username: 'leofit',
      email: 'leo.clark@healthmail.com',
      password: bcrypt.hashSync('leopassword'),
      bio: `🏋️‍♂️ Hey! I’m Leo Clark, a personal trainer and nutrition coach from Dallas, TX. My goal is to help people achieve their fitness goals with effective workout and nutrition plans.
            I’m all about balance and making fitness fun! Let’s connect if you’re interested in fitness tips or training sessions! 💪`,
      profilePhoto: null,
    },
    {
      id: 'n2a3b7c6-8f1e-4b5d-9c7a-4d5f6e8b9a2d',
      firstName: 'Ruby',
      lastName: 'Foster',
      username: 'rubywrites',
      email: 'ruby.foster@creative.com',
      password: bcrypt.hashSync('rubypassword'),
      bio: `💡 Hi, I’m Ruby Foster, a copywriter and content strategist from Washington, D.C. I help brands tell their stories and engage with audiences in meaningful ways. I’m passionate about creative writing and storytelling.
            Let’s connect if you’re in need of compelling content or just want to talk words and ideas! 📄`,
      profilePhoto: null,
    },
    {
      id: 'o3d4f7e1-5a9b-4c3d-8f5e-7d1c6a9b2f4d',
      firstName: 'Max',
      lastName: 'Cooper',
      username: 'maxtravels',
      email: 'max.cooper@adventuremail.com',
      password: bcrypt.hashSync('maxpassword'),
      bio: `🚴 Hi! I’m Max Cooper, an adventure cyclist and travel writer based in Portland, ME. I document my travels on two wheels, exploring backroads, mountain trails, and hidden paths.
            Let’s connect if you’re into cycling, travel stories, or outdoor adventures! 🌄`,
      profilePhoto: null,
    },
    {
      id: 'p5f6c9e4-7a1b-4d2c-9e8b-3d7a4f6b2c5d',
      firstName: 'Isabella',
      lastName: 'Evans',
      username: 'isabellacooks',
      email: 'isabella.evans@foodie.com',
      password: bcrypt.hashSync('isabellapassword'),
      bio: `🍲 Hi! I'm Isabella Evans, a chef and food blogger from Los Angeles, CA. I love creating recipes that are delicious, healthy, and easy to make. My mission is to inspire others to enjoy cooking and eating good food.
            Connect with me if you’re a fellow food lover or want to exchange recipes! 👩‍🍳`,
      profilePhoto: null,
    },
    {
      id: 'q2e1b5d6-7f9a-4a1b-8c9e-1b8f5c3e4f2d',
      firstName: 'Alice',
      lastName: 'Harris',
      username: 'aliceinspired',
      email: 'alice.harris@inspiration.com',
      password: bcrypt.hashSync('alicepassword'),
      bio: `🌈 Hi! I’m Alice Harris, a creative director and visual artist based in Miami, FL. I’m passionate about art that uplifts and inspires. My work often focuses on color and emotion. 
            If you love exploring art or want to collaborate on a creative project, let’s connect! 🎨`,
      profilePhoto: null,
    },
    {
      id: 'r3f6a9c8-4e1b-4a2d-8b6c-5a1d2f3b4e5f',
      firstName: 'Ethan',
      lastName: 'Miller',
      username: 'ethaninnovates',
      email: 'ethan.miller@techideas.com',
      password: bcrypt.hashSync('ethanpassword'),
      bio: `💡 Hey! I’m Ethan Miller, a product designer and innovator from San Francisco, CA. I focus on creating user-friendly experiences that solve real problems. 
            I love collaborating with other creatives to bring ideas to life! Let’s connect if you’re interested in design or tech! 🚀`,
      profilePhoto: null,
    },
    {
      id: 's4a7b6c1-2e3f-4b8d-9c5a-7c9e1b4f5d1e',
      firstName: 'Mia',
      lastName: 'Young',
      username: 'miacreates',
      email: 'mia.young@artsy.com',
      password: bcrypt.hashSync('miapassword'),
      bio: `✂️ Hi! I’m Mia Young, a craft enthusiast and DIY blogger from Portland, OR. I love creating things with my hands and sharing my projects with others. 
            If you’re into crafts, DIY home decor, or creative living, let’s connect! 🧵`,
      profilePhoto: null,
    },
    {
      id: 't6b9f5c3-1d2a-4e7b-9f5a-3e2d7c1b4f6e',
      firstName: 'James',
      lastName: 'Taylor',
      username: 'jamestaylorsings',
      email: 'james.taylor@musicmail.com',
      password: bcrypt.hashSync('jamestaylorpassword'),
      bio: `🎤 Hey! I’m James Taylor, a singer-songwriter based in Nashville, TN. Music is my passion, and I love sharing my stories through my songs. 
            I’m always looking for new collaborations and opportunities to perform. Let’s make some music together! 🎶`,
      profilePhoto: null,
    },
    {
      id: 'u1c8e7f4-5a3b-4c5d-8f9e-4e1b2c3f8b2d',
      firstName: 'Sophie',
      lastName: 'Robinson',
      username: 'sophiesketches',
      email: 'sophie.robinson@artlover.com',
      password: bcrypt.hashSync('sophiepassword'),
      bio: `🖌️ Hi! I’m Sophie Robinson, an illustrator and art teacher from Denver, CO. I create whimsical illustrations and love teaching art to others. 
            Let’s connect if you’re interested in art, teaching, or collaboration! 🌟`,
      profilePhoto: null,
    },
    {
      id: 'v3b6d2e9-8f1c-4e7b-9d8f-5a2e4c1b3f5e',
      firstName: 'Henry',
      lastName: 'Hall',
      username: 'henrytheexplorer',
      email: 'henry.hall@traveler.com',
      password: bcrypt.hashSync('henrypassword'),
      bio: `🌍 Hey there! I’m Henry Hall, an adventure traveler and photographer based in Seattle, WA. I love exploring new cultures and capturing the beauty of the world through my lens. 
            If you’re into travel, photography, or adventure stories, let’s connect! 📸`,
      profilePhoto: null,
    },
    {
      id: 'w2e3b5c4-1d8a-4f2e-9f5c-6d1a2b3f4c5e',
      firstName: 'Lily',
      lastName: 'Green',
      username: 'lilywrites',
      email: 'lily.green@writer.com',
      password: bcrypt.hashSync('lilypassword'),
      bio: `✍️ Hi! I’m Lily Green, a freelance writer and editor from Boston, MA. I specialize in content writing and storytelling. I’m passionate about sharing ideas that matter. 
            Let’s connect if you’re interested in writing or need help with your content! 📖`,
      profilePhoto: null,
    },
    {
      id: 'x3d8f1c2-5b4a-4d2e-8b6c-3a9e4b1f5c2d',
      firstName: 'Oliver',
      lastName: 'Adams',
      username: 'oliverpainter',
      email: 'oliver.adams@artistic.com',
      password: bcrypt.hashSync('oliverpassword'),
      bio: `🎨 Hello! I’m Oliver Adams, a painter and art instructor from Chicago, IL. My work focuses on abstract art and the emotions it evokes. 
            If you love art or want to learn to paint, let’s connect! 🌈`,
      profilePhoto: null,
    },
    {
      id: 'y4c3b2e5-6a1f-4a8d-9c1c-5b3e2d4f5c6e',
      firstName: 'Nora',
      lastName: 'Scott',
      username: 'norascape',
      email: 'nora.scott@photomail.com',
      password: bcrypt.hashSync('norapassword'),
      bio: `📷 Hi! I’m Nora Scott, a landscape photographer from Anchorage, AK. I specialize in capturing the beauty of nature and wild landscapes. 
            Let’s connect if you share a passion for photography or outdoor adventures! 🏞️`,
      profilePhoto: null,
    }
   ])
  },
  async down (queryInterface, Sequelize) {
    await User.destroy({
      where: {
        [Op.or]: [
          { id: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2' },
          { id: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3' },
          { id: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2' },
          { id: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15' },
          { id: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6' },
          { id: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9' },
          { id: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e' },
          { id: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56' },
          { id: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13' },
          { id: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f' },
          { id: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34' },
          { id: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a' },
          { id: 'd1b7b5f3-6e4b-49a3-8e32-2b9c3d1f5b12' },
          { id: 'f1a8c3d7-5e2b-4d9a-9e3c-7b1c5e3f4a5b' },
          { id: 'g5e9b3c1-8f1a-4c9e-9b8e-4d5b2f3e7f9d' },
          { id: 'h6f7d2e4-5a6c-4b8d-8f3c-3b1e2a8f4c3d' },
          { id: 'i8d4e9c3-6b7a-4e5d-9f2c-4d7e6c5f1a8d' },
          { id: 'j7a5f3e2-4c1b-4b6d-9f8e-5e6a3c2d4b1c' },
          { id: 'k5d3c1e7-9f8a-4d2e-8c6b-7e1a3f9d6b2c' },
          { id: 'l4e2b1f5-8d7c-4a9e-9f3b-5a7c6e2d3f4c' },
          { id: 'm9e8f2d7-5a3b-4c6d-8f9e-7d1a2c5b4e3f' },
          { id: 'n2a3b7c6-8f1e-4b5d-9c7a-4d5f6e8b9a2d' },
          { id: 'o3d4f7e1-5a9b-4c3d-8f5e-7d1c6a9b2f4d' },
          { id: 'p5f6c9e4-7a1b-4d2c-9e8b-3d7a4f6b2c5d' },
          { id: 'q2e1b5d6-7f9a-4a1b-8c9e-1b8f5c3e4f2d' },
          { id: 'r3f6a9c8-4e1b-4a2d-8b6c-5a1d2f3b4e5f' },
          { id: 't6b9f5c3-1d2a-4e7b-9f5a-3e2d7c1b4f6e' },
          { id: 'u1c8e7f4-5a3b-4c5d-8f9e-4e1b2c3f8b2d' },
          { id: 'v3b6d2e9-8f1c-4e7b-9d8f-5a2e4c1b3f5e' },
          { id: 'w2e3b5c4-1d8a-4f2e-9f5c-6d1a2b3f4c5e' },
          { id: 'x3d8f1c2-5b4a-4d2e-8b6c-3a9e4b1f5c2d' },
          { id: 'y4c3b2e5-6a1f-4a8d-9c1c-5b3e2d4f5c6e' },
          { id: 's4a7b6c1-2e3f-4b8d-9c5a-7c9e1b4f5d1e' }
        ]
      }
    })
  }
};