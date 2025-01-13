const express = require('express');
const { User, Group, GroupUser, Post, PostLike } = require('../../db/models');
const { Op, Sequelize } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const group_id = req.params.id;

    const group = await Group.findOne({
      where: {
        [Op.or]: [
          { id: group_id },
          { groupName: group_id },
        ]
      }, 
      attributes: ['id', 'groupName', 'profilePhoto', 'bio'],
      include: [
        {
          model: GroupUser,
          attributes: ['id'],
        },
        {
          model: Post,
          attributes: ['id'],
          include: [
            {
              model: PostLike,
              as: 'Likes',
              attributes: ['id'],
            },
          ],
        }
      ],
    });

    if (!group) throw {status: 404, title: 'Resource Not Found', message: 'Group Not Found'}

    let likes = 0;

    for (let i = 0; i < group.Posts.length; i++) {
      const data = group.Posts[i];
      likes+= data.Likes.length;
    }

    return res.json({
     id: group.id,
     groupName: group.groupName,
     profilePhoto: group.profilePhoto,
     bio: group.bio || 'hello',
     GroupUsers: group.GroupUsers.length,
     Posts: group.Posts.length,
     Likes: likes,
    })


  } catch(error) {
    next(error)
  }
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.user;
    const groups = await Group.findAll({ where: { userId: id }, attributes: ['groupId']});

  } catch(error) {
    next(error)
  }
});

module.exports = router;