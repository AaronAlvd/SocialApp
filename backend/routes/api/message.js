const express = require('express');
const { User, Message, Chat } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/:chatId', async (req, res, next) => {

});

// router.get('/suggested', async (req, res, next) => {
//   try {

//     });
//   } catch {
//     next(error)
//   }
// });

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const id = req.user.id;
    const chats = await Chat.findAll({
      where: { 
        [Op.or]: [
          { userId: id },
          { user2Id: id },
        ]
      }, 
      attributes: ['id', 'userId', 'user2Id'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Message,
          attributes: ['content', 'attachment'],
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
        {
          model: User,
          as: 'User1',
          attributes: ['id','firstName', 'lastName', 'username', 'profilePhoto']
        },
        {
          model: User,
          as: 'User2',
          attributes: ['id','firstName', 'lastName', 'username', 'profilePhoto']
        }
      ]
    });

    if (chats.length === 0) {
      throw {status: 201, title: 'Resource Not Found', message: "You don't have any messages"}
    }

    res.json(chats)

  } catch(error) {
    next (error)
  }
});

module.exports = router;