const posts01 = [
  {
    id: 'p1d1c0d8-99e0-4a52-b5ae-78a7e0c00b01',
    userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2', // James Hathaway
    caption: `Finally wrapped up my latest project—a minimalist logo design for a local brand. I loved experimenting with clean lines and earthy tones! 🖌️ #DesignLife #Minimalism`,
    photo: 'https://pixabay.com/get/g8736b9691e5ddc080d24e1303aa6f9ca41012cb7c1f78a3ee6b64207212e956c3b9a8b5b47d429bed2f101c454373ce5_640.jpg',
  },
  {
    id: '973010c6-39c4-4aa7-8891-84872b1ff269',
    userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
    caption: 'Exploring new horizons with this landscape shot. 🌄 #NaturePhotography',
    photo: 'https://pixabay.com/get/ged1688cbe59a7e9f8b46f28347074ff2f456dfd4d9875e70cb23234ef02c116ac0b0765e8fb32939f1575a1f7f0eb223f6e1d9ae6d11e123af1325c61ee0c277_640.jpg',
  },
  {
    id: 'edd66fcd-9da2-4415-8304-27181ce43010',
    userId: 'd4a7cfdc-49b6-4a82-a9b2-726c3fbb91a2',
    caption: 'Caught this moment of serenity at the park. 🏞️ #PeacefulVibes',
    photo: 'https://pixabay.com/get/gf8abec45c5213518ae419b24a2812e25f6d84511554f435188b906d2d545c9c3f3ec717631636f2296c07094824ccbccd5120d12ee68eba8e14dfa656b64f8e8_640.jpg',
  },
  {
    id: '674098a3-e1d4-4884-8219-d4c63151e9e4',
    userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
    caption: 'Sharing a glimpse of my urban exploration journey. 🏙️ #Cityscape',
    photo: 'https://pixabay.com/get/g3cf337d4ae51d137ae9ca1cf6662e345f29880b58ada0efb07826f770e0926b92035cf99efb44b9a6ef2450d8dd05166_640.jpg',
  },
  {
    id: 'b6fcf9c5-d246-4e66-8406-762932478bf4',
    userId: 'b4d7ae0a-3c91-4b5d-85ab-55d07eecf7c6',
    caption: 'Here’s a throwback to my last beach day. 🏖️ #SunnyTimes',
    photo: 'https://pixabay.com/get/ga455f4e64efc015963b251eb9f2e2dedd7a316045263262cbfc8f47f59b5e74dee5a44eee09d169ac0730eb02a620bde8f16789e4dc9729b9a3041b567362c79_640.jpg',
  },
  {
    id: '1b027c1c-7263-4622-8ec9-f5054acf446f',
    userId: 'c2b45d83-1e6c-41f4-9a5e-2f58b9ec27d9',
    caption: 'Diving into some vibrant street art. 🎨 #ColorSplash',
    photo: 'https://pixabay.com/get/g993ff36a5f2e3630fb948b912d7413b4ff5deca68ebb3a581bc728bf363fba0609fdfbe552fc5314d7463015366b7cebc70294b65e1662d4536fb96e4f536f4e_640.jpg',
  },
  {
    id: '3a984767-2c84-4449-8d46-ee0708275bb1',
    userId: 'e7a9eaf2-7dd3-49d5-93f2-1e4f5d2a8c7e',
    caption: 'Here’s a snapshot from my garden—pure bliss. 🌺 #NatureAtHome',
    photo: 'https://pixabay.com/get/gd2a3da93dcb78451b9628700421807d4dc1e7a26388721925a3323ad74218d67e5a49ddd233b96e3d824739e8ac6ab13c164f35649648ec52dd48a8d71a71117_640.jpg',
  },
  {
    id: 'd0edcdb0-1a15-47a9-8765-5a66a8506260',
    userId: 'd6f12a4e-549b-42c9-8a8e-47f4c6aefc56',
    caption: 'A perfect day for hiking! 🌲 #TrailLife',
    photo: 'https://pixabay.com/get/gefcd7b9d4048607366f82f08ce885db817948809c3221568731edd0c0ad0cb3398ae00caa401fdfe5cfb9b97f81e2a4e41a756f6cbd3051d64a1c6b583758592_640.jpg',
  },
  {
    id: '05e26508-5361-4bf3-8982-ce824c91bfa7',
    userId: 'a6b72c2f-3f5e-4b6b-91e4-774c8e5b4d13',
    caption: 'This view took my breath away. 🌅 #EveningMagic',
    photo: 'https://pixabay.com/get/gabb0e046cab9fca76ca24e1f7734653e181acc060a67699c6d953913ce3e210b58ebf5e32a2ef5269d790bdc35c185de_640.jpg',
  },
  {
    id: 'c291f56c-db1c-4343-bb4e-819c2431a5c1',
    userId: 'f8d8e7b3-4d78-4ab3-9b1a-1c6e5a1d7e8f',
    caption: 'Capturing the soul of the city through its architecture. 🏛️ #UrbanDreams',
    photo: 'https://pixabay.com/get/g2a0be8818857e6fec3f0c46acbe6e9888fab337ec0bcacf77d6be3f5a92c2e197f230dcf211f0bfc0e83aaec3891271aea6e708809dd67b5a7aeafbc4b617bc6_640.jpg',
  },
  {
    id: 'f4c66bc4-58fe-45dd-a356-3b39628653e9',
    userId: 'c9f6f4a1-4d3f-4aeb-8e32-5c8c3c1d6f34',
    caption: 'Couldn’t resist sharing this cute little critter. 🐿️ #WildlifeLove',
    photo: 'https://pixabay.com/get/gf3b2822553e84baa1fcd744ca29d5e56ff2c5a0ad9db3ff67db86ff3e1d9569505abe58fcba5b0add23e2f37e206914ca61aeb4c3803fe8299bc83560592f7fa_640.jpg',
  },
  {
    id: '5673525e-0a32-4083-9807-4fc82de9e748',
    userId: 'b3e4d2f1-5c6a-49a4-8bfa-8b9a4e3f7d2a',
    caption: 'Morning dew on flowers is just mesmerizing. 🌸 #SimplePleasures',
    photo: 'https://pixabay.com/get/gf9fb63cff8a79b8b1004974ee2e44e72ade44b255be5a21d82aa17c40d909d48976f7b1299efebec30732dab7b7bd19fae846bbe8ae956749b3b1e5e785cfe04_640.jpg',
  },
  {
    id: '90f64eaa-3205-4787-ae53-8cbdcc53084f',
    userId: 'e0fbe97e-9aa7-4733-a7ea-65a6ddbf53d2',
    groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
    caption: `Finally wrapped up my latest project—a minimalist logo design for a local brand. I loved experimenting with clean lines and earthy tones! 🖌️ #DesignLife #Minimalism`,
    photo: 'https://pixabay.com/get/g721d854d900bf7d34a6f3c437f03cd5f7a90184edaf879aae4830352bad2208f4b319696b648683bf621affd6b59bc45363e216a4ed15d60fde6592f00d75f2b_640.jpg',
  },
  {
    id: '7ac2424d-4ef7-444a-90cc-99163e69f17f',
    userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
    groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
    caption: 'Exploring new horizons with this landscape shot. 🌄 #NaturePhotography',
    photo: 'https://pixabay.com/get/g6f298d3949d39f8429fe6d152dfba2571e8b0bb5b2508f7d6472873803104ac3058f4ebf520debeb63b4db82e7b5fcbda826253dfde191e1c428b5d12785b8b1_640.jpg',
  },
  {
    id: '707f45a1-061a-4606-9aab-2462bd07dd63',
    userId: 'a1fbc967-1fae-467e-8b56-98b6e7d19df3',
    groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
    caption: 'Caught this moment of serenity at the park. 🏞️ #PeacefulVibes',
    photo: 'https://pixabay.com/get/g9490369a67652d4035bf60f11a004fb8f63437216c968fb74f27a331d671ade2469b700c0d85f0ea51dc2f430182832249121bcc79da5f5683e1e00fcb1dfd31_640.jpg',
  },
  {
    id: 'e17b2528-bc99-425d-9969-97a97b9f2bcb',
    userId: 'f9d6b7e2-4d56-4ab3-b47d-f8a0e8ec9a15',
    groupId: 'acd44161-0ce5-44c3-8bb6-b0e983857aac',
    caption: 'Sharing a glimpse of my urban exploration journey. 🏙️ #Cityscape',
    photo: 'https://pixabay.com/get/g7587ef24c86b45d32f0bccd608e5dc8d873a65f72c9da7db0021948abb756996e89ca39af87851eba4dd5c080b7579bd_640.jpg',
  },
]

module.exports = { posts01 }