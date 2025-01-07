const express = require('express');
const { Post, Comment, User, Follow, PostLike, GroupUser, Group, CommentLike } = require('../../db/models');
const { Op, Sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


router.get('/comments/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await Post.findByPk(id, {
      attributes: [],
      include: [
        {
          model: Comment,
          attributes: ['id', 'postId', 'comment'],
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'profilePhoto']
            },
            {
              model: CommentLike,
              attributes: ['id'],
            }
          ]
        },
      ]
    });

    if (!post) {
      throw {status: 404, title: 'Resource Not Found', message: 'Post Not Found'}
    }

    return res.json(post.Comments);

  } catch(error) {
    next(error)
  }
});

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
          attributes: ['id']
        }
      ],
    })

    myPosts.forEach((post) => posts.push(post));

    for (let data of following) {
      const post = await Post.findAll({ 
        where: { userId: data.followingId, groupId: 'default' },
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
            attributes: ['id']
          }
        ],
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
            attributes: ['username', 'firstName', 'lastName', 'profilePhoto']
          },
          {
            model: PostLike,
            as: 'Likes',
            attributes: ['postId', 'userId']
          },
          {
            model: Group,
            attributes: ['groupName','profilePhoto', 'id']
          },
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