const groups = [
  {
    id: 'default',
    groupName: 'default',
    status: 'public',
  },
  {
    id: "4af42174-4a84-4202-b1a8-ebe4a701535b",
    groupName: "TeamPioneers",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1KWRAoi-TQg3rFB5qLNv5G2eCQTevjfx9",
    backgroundPhoto: null,
    bio: "Focusing on what truly matters. Focused on growth and excellence. Constantly learning something new. Optimistic by nature, determined by choice. Aiming for success while enjoying the ride.",
  },
  {
    id: "856bc081-fb37-40db-a042-fa19f0938c6a",
    groupName: "DigitalDynamos",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=15yQpj7UFuNSTrCOfeS1EU9vl2KujXr_Q",
    backgroundPhoto: null,
    bio: "Striving for progress, not perfection. Empowering others to succeed. Avid traveler with a camera in hand. Tough on challenges, gentle on people. Turning dreams into plans, and plans into reality.",
  },
  {
    id: "7b8c5015-e7a7-4504-8f8a-b0b5509b8414",
    groupName: "CodeCrusaders",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1v1i_UC2CcC8sjb1rmIbHwYnIhGaZWHAa",
    backgroundPhoto: null,
    bio: "Laughing through life’s ups and downs. Inspiring change through technology. Coffee lover and weekend adventurer. Fueled by passion and a love for learning. On a journey to inspire and uplift others.",
  },
  {
    id: "11ecb6d6-29d8-48be-b912-ae7fda5ae442",
    groupName: "VisionaryVanguard",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1NKruKplbU8dqacLthOB0ff9WNRWltFk3",
    backgroundPhoto: null,
    bio: "Striving for progress, not perfection. Empowering others to succeed. Diving into the world of [specific hobby or interest]. Living authentically, no filters needed. Turning dreams into plans, and plans into reality.",
  },
  {
    id: "d8e49de9-a7b6-4166-be56-02aad30d8b2e",
    groupName: "PixelPirates",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1-GhPvqb8NRfEdIvMRlSkFIc8G4wP8BkR",
    backgroundPhoto: null,
    bio: "Always learning, always growing. Leading with innovation and purpose. Always seeking new adventures. Empathetic and always listening. Aiming for success while enjoying the ride.",
  },
  {
    id: "d0014920-8fbd-4b5b-8e86-f8971f7ddbe1",
    groupName: "QuantumQuest",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1vp5LU4OdZfhDuquuEVz8v4DAS2NZ5tOr",
    backgroundPhoto: null,
    bio: "Surrounded by good vibes only. Inspiring change through technology. Obsessed with creating and exploring new things. Curious, creative, and always up for a challenge. Aiming for success while enjoying the ride.",
  },
  {
    id: "971ad97e-15a9-4b19-be38-9c0e9765b462",
    groupName: "MindMavericks",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=18VYuiTC12uPJeOGgacJv_KTEMY6lFsDK",
    backgroundPhoto: null,
    bio: "Laughing through life’s ups and downs. Redefining success through passion and dedication. Collecting memories and experiences. Curious, creative, and always up for a challenge. Striving for excellence in everything I do.",
  },
  {
    id: "3f79b54e-bee9-4b25-bd4a-bc2f81a0bcc6",
    groupName: "StellarSquad",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1mDYdd_uRt54ugSK_eif-P86X6Ny8tQqi",
    backgroundPhoto: null,
    bio: "Celebrating every step of the way. Building a future with limitless possibilities. Building memories one trip at a time. Driven by purpose and a desire to make a difference. Driven by ambition and a sense of purpose.",
  },
  {
    id: "5a4cd34d-adc0-45c3-b035-366fc819edd8",
    groupName: "BrainwaveBrigade",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1irD6q6tAaYeM8gLXTVjzHAS_qYbQRzI5",
    backgroundPhoto: null,
    bio: "Finding joy in the little things. Helping businesses grow through innovation. Constantly learning something new. Constantly evolving into a better version of myself. Focused on personal growth and meaningful impact.",
  },
  {
    id: "0d0b734b-b50d-4c7d-99fd-94fd655964a7",
    groupName: "InfiniteInnovators",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1RBeHpZqyZ1UhRIQPusGe7KJEkevfF6d9",
    backgroundPhoto: null,
    bio: "Celebrating every step of the way. Focused on making an impact in the digital world. Living life with a paintbrush in hand. Constantly evolving into a better version of myself. Building a legacy of passion and purpose.",
  },
  {
    id: "00cc0aae-86ff-4ea6-bb9c-d956d9fd5cc1",
    groupName: "NexusNetwork",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1gR6TXbWP86hty9LYpHvrvJpF6pEIrwDJ",
    backgroundPhoto: null,
    bio: "Striving for progress, not perfection. Driven by results and collaboration. Exploring the world through food and culture. Fiercely independent, yet a team player. Turning dreams into plans, and plans into reality.",
  },
  {
    id: "8f70e6b9-79ca-42a8-b279-5ee115e1bc22",
    groupName: "ThunderTrek",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1UxlETm2cTIZ4lTQI2ONIsflCryxMOzk8",
    backgroundPhoto: null,
    bio: "Striving for progress, not perfection. Building a future with limitless possibilities. Passionate about photography and storytelling. A little quirky, but full of heart. Aiming for success while enjoying the ride.",
  },
  {
    id: "33eb6bfa-cf74-461e-b1c0-5792645daa0e",
    groupName: "CipherCrew",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1dABKv8De_LLqAj4SMIIXe7Sit5zdTLRe",
    backgroundPhoto: null,
    bio: "Grateful for the small wins and big moments. Solving problems with creativity and strategy. Avid traveler with a camera in hand. Bold thinker, risk-taker, dream-maker. Driven by ambition and a sense of purpose.",
  },
  {
    id: "9c420b87-20d3-4f9d-a00f-bf95acd54c97",
    groupName: "IdeaForge",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=16wp-qZh1GeAyViVCKh_qFux6w3_1vuk9",
    backgroundPhoto: null,
    bio: "Chasing dreams, one step at a time. Crafting solutions for modern challenges. Living life with a paintbrush in hand. Equal parts introvert and extrovert. Always aiming higher, one step at a time.",
  },
  {
    id: "e7113d2a-4259-4879-9097-d58cf1352e37",
    groupName: "AlphaAlliance",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1DgpG3Dyk4WmXMXSt1cl51JS-junxr898",
    backgroundPhoto: null,
    bio: "Striving for progress, not perfection. Leading with innovation and purpose. Obsessed with creating and exploring new things. Thriving on positivity and growth. Driven by ambition and a sense of purpose.",
  },
  {
    id: "b248d6cb-d25d-4ff2-b793-243324d51b37",
    groupName: "SparkSyndicate",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1001SlJtzM176MmXzHK1OaMf587NTyfZH",
    backgroundPhoto: null,
    bio: "Loving the journey, wherever it takes me. Tech enthusiast | Entrepreneur | Visionary. Obsessed with creating and exploring new things. A dreamer with big plans and a kind heart. Aiming for success while enjoying the ride.",
  },
  {
    id: "c5acca48-5e2f-46ba-b05a-83007ff4ec01",
    groupName: "NeonNomads",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1RwGrbS8dO1tbmGzLzbotCgpOWJZA3UR1",
    backgroundPhoto: null,
    bio: "Laughing through life’s ups and downs. Leading with innovation and purpose. Building memories one trip at a time. Thriving on positivity and growth. Turning dreams into plans, and plans into reality.",
  },
  {
    id: "e7e6b344-d1cc-4050-a05d-238f66b42cb8",
    groupName: "OmegaOutlaws",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=14i8beZzdBo4mS7GvaRvFlKMLHI_oWsRp",
    backgroundPhoto: null,
    bio: "Chasing dreams, one step at a time. Empowering others to succeed. Books, coffee, and endless inspiration. Living authentically, no filters needed. Turning dreams into plans, and plans into reality.",
  },
  {
    id: "a8ceb419-6c98-4e1b-81ac-7b20dc094a2b",
    groupName: "DataDaredevils",
    status: "Private",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1V0jvDhXQDHdBOcZhG68F7wZDhDgyn7d5",
    backgroundPhoto: null,
    bio: "Embracing change and new experiences. Leading with innovation and purpose. Coffee lover and weekend adventurer. Optimistic by nature, determined by choice. Focused on personal growth and meaningful impact.",
  },
  {
    id: "29a176f1-ca7b-43b9-8f3e-d14260e0992d",
    groupName: "QuantumQuokkas",
    status: "Public",
    profilePhoto:
      "https://drive.google.com/thumbnail?id=1BBS4hgU6HgdfjWQnj08xGMhYW_DTCxH8",
    backgroundPhoto: null,
    bio: "Striving for progress, not perfection. Focused on growth and excellence. Collecting memories and experiences. Equal parts introvert and extrovert. Always aiming higher, one step at a time.",
  },
];

module.exports = { groups };
