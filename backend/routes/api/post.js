const express = require('express');
const { Post, Comment, User, Follow, PostLike, GroupUser, Group } = require('../../db/models');
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const router = express.Router();



router.get('/following', requireAuth, async (req, res, next) => {
  try {
    const posts = [];
    const userId = req.user.id;

    const following = await Follow.findAll({
      where: { followerId: userId },
    });

    const myPosts = await Post.findAll({ 
      where: { userId: userId, groupId: 'default'},
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'username', 'profilePhoto']
        },
        {
          model: PostLike,
          as: 'Likes',
          attributes: ['postId', 'userId']
        },
        {
          model: Comment,
          attributes: ['userId', 'postId', 'comment'],
          include: [
            { 
              model: User, 
              attributes: ['username', 'id', 'profilePhoto']
            }
          ]
        }
      ]
    })

    myPosts.forEach((post) => posts.push(post));

    for (let data of following) {
      const post = await Post.findAll({ 
        where: { userId: data.followedId, groupId: 'default' },
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName', 'username', 'profilePhoto']
          },
          {
            model: PostLike,
            as: 'Likes',
            attributes: ['postId', 'userId']
          },
          {
            model: Comment,
            attributes: ['userId', 'postId', 'comment'],
            include: [
              { 
                model: User, 
                attributes: ['username', 'id', 'profilePhoto']
              }
            ]
          }
        ]
      });
      
      if (post) {
        posts.push(post)
      }
    }

    return res.send(posts.flat());
  } catch(error) {
    next(error);
  }
});

router.get('/groups', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const groups = await GroupUser.findAll({ where: { userId: userId }});

    if (groups.length === 0) {
      throw { status: 404, title: 'Resource Not Found', message: 'You are not in any groups'}
    }

    let Posts = [];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]
      const data = await Post.findAll({ 
        where: { groupId: group.groupId },
        attributes: ['id', 'groupId', 'userId', 'caption', 'photo', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: PostLike,
            as: 'Likes',
            attributes: ['postId', 'userId']
          },
          {
            model: Group,
            attributes: ['profilePhoto', 'id']
          },
          {
            model: Comment,
            attributes: ['userId', 'postId', 'comment'],
            include: [
              { 
                model: User, 
                attributes: ['username', 'id', 'profilePhoto']
              }
            ]
          }
        ],
      })
      Posts.push(...data)
    }

    return res.json(Posts)

  } catch (error) {
    next(error)
  }
});

router.get('/:postId', requireAuth, async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'username', 'profilePhoto']
        },
        {
          model: Like,
          attributes: ['postId', 'userId']
        },
        {
          model: Comment,
          attributes: ['userId', 'postId', 'comment'],
          include: [
            { 
              model: User, 
              attributes: ['username', 'id', 'profilePhoto']
            }
          ]
        }
      ]
    });

    return res.json(post);

  } catch(error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {

  } catch(error) {
    next(error);
  }
});

module.exports = router; 