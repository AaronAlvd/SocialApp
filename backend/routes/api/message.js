const express = require('express');
const { User, Message, Chat } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { v4: uuid } = require('uuid');
const router = express.Router();

router.get('/:userId', requireAuth, async (req, res, next) => {
  try {
    const primaryUserId = req.user.id
    const secondaryUserId = req.params.userId

    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { userId: primaryUserId },
              { user2Id: secondaryUserId },
            ]
          }, 
          {
            [Op.and]: [
              { userId: secondaryUserId },
              { user2Id: primaryUserId },
            ]
          }
        ]
      }, 
      attributes: ['id', 'userId', 'user2Id'],
    })

    const messages = await Message.findAll({
      where: {
        chatId: chat.id
      },
      include: [
        {
          model: User,
          attributes: ['id', 'profilePhoto', 'username', 'firstName', 'lastName']
        },
      ]
    })

    res.json(messages)

  } catch (error) {
    next(error)
  }
})

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
})

router.post('/:userId', requireAuth, async (req, res, next) => {
  try {
    const primaryUserId = req.user.id
    const secondaryUserId = req.params.userId
    const content = req.body.content
    const chatId = uuid()
    const messageId = uuid()

    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { userId: secondaryUserId },
              { user2Id: primaryUserId }
            ]
          },
          {
            [Op.and]: [
              { userId: primaryUserId },
              { user2Id: secondaryUserId }
            ]
          }
        ]
      },
      attributes: ['id', 'userId', 'user2Id']
    })

    if (!chat) {
      const newChat = await Chat.create({
        id: chatId,
        userId: primaryUserId,
        user2Id: secondaryUserId,
      })
    }

    const newMessage = await Message.create({
      id: messageId,
      chatId: chat ? chat.id : chatId,
      userId: primaryUserId,
      content: content,
    })

    res.json({'message': 'Success!'})

  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const userId = req.user.id;

    const deleteMessage = await Message.destroy({
      where: {
        id: messageId,
        userId: userId,
      }
    })

    res.json({'message': 'Deletion Confirmed!'})

  } catch (error) {
    next(error)
  }
})

module.exports = router;