const express = require('express');
const { Post, Comment, User, Follow, PostLike, GroupUser, Group, CommentLike } = require('../../db/models');
const { v4: uuid } = require('uuid')
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
          attributes: ['id', 'postId', 'comment', 'createdAt', 'userId'],
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'profilePhoto']
            },
            {
              model: CommentLike,
              attributes: ['id'],
            }
          ],
          order: [['createdAt', 'DESC']]
        },
      ]
    });

    if (!post) {
      throw {status: 404, title: 'Resource Not Found', message: 'Post Not Found'}
    }

    res.json(post.Comments);
    return post.Comments;
  } catch(error) {
    next(error)
  }
});

router.get('/following', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const following = await Follow.findAll({
      where: { followerId: userId },
      attributes: ['followingId']
    });

    const followedIds = Array(following.length + 1);
    followedIds[following.length] = userId;

    for (let i = 0; i < following.length; i++) {
      followedIds[i] = following[i].followingId
    }

    const posts = await Post.findAll({
      where: {
        userId: {[Op.in]: followedIds },
        groupId: 'default',
      },
      attributes: ['id', 'userId', 'caption', 'photo', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName', 'profilePhoto', 'username']
        },
        {
          model: Comment,
          attributes: ['id'],
        },
        {
          model: PostLike,
          as: 'Likes',
          attributes: ['id', 'userId']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const newArray = Array(posts.length)

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      let userLiked = false; // Flag to check if the user has liked this post
    
      for (let j = 0; j < post.Likes.length; j++) {
        const like = post.Likes[j];
        if (userId === like.userId) {
          userLiked = true; // If the user has liked the post, set flag to true
          break; // No need to continue checking after the first match
        }
      }
    
      newArray[i] = {
        id: post.id,
        userId: post.userId,
        caption: post.caption,
        photo: post.photo,
        createdAt: post.createdAt,
        User: post.User,
        Comments: post.Comments,
        Likes: post.Likes,
        Like: userLiked,
      }
    }

    res.json(newArray)

  } catch(error) {
    next(error);
  }
});

router.get('/groups', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const groups = await GroupUser.findAll({ 
      where: { userId: userId },
      attributes: ['groupId'],
    });

    if (groups.length === 0) {
      throw { status: 404, title: 'Resource Not Found', message: 'You are not in any groups'}
    }

    const groupIds = Array(groups.length);

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      groupIds[i] = group.groupId;
    }

    const posts = await Post.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds
        }
      },
      attributes: ['id', 'groupId', 'userId', 'caption', 'photo', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName', 'profilePhoto', 'username']
        },
        {
          model: Group,
          attributes: ['id', 'groupName', 'profilePhoto']
        },
        {
          model: Comment,
          attributes: ['id'],
        },
        {
          model: PostLike,
          as: 'Likes',
          attributes: ['id', 'userId']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const newArray = Array(posts.length)

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      let userLiked = false; // Flag to check if the user has liked this post
    
      for (let j = 0; j < post.Likes.length; j++) {
        const like = post.Likes[j];
        if (userId === like.userId) {
          userLiked = true; // If the user has liked the post, set flag to true
          break; // No need to continue checking after the first match
        }
      }
    
      newArray[i] = {
        id: post.id,
        userId: post.userId,
        caption: post.caption,
        photo: post.photo,
        createdAt: post.createdAt,
        User: post.User,
        Group: post.Group,
        Comments: post.Comments,
        Likes: post.Likes,
        Like: userLiked,
      }
    }

    res.json(newArray);

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

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const id = uuid();
    const groupId = req.body.groupId;
    const caption = req.body.caption || null;
    const photo = req.body.photo || null;

    const post = await Post.create({
      id: id,
      groupId: groupId,
      userId: user_id,
      caption: caption || null,
      photo: photo || null,
    });

    res.json(post);

  } catch(error) {
    next(error);
  }
});

router.delete('/:postId', requireAuth, async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const post_id = req.params.postId;

    const post = await Post.destroy({
      where: {
        id: post_id,
        userId: user_id,
      }
    })

    res.json(post)

  } catch(error) {
    next(error)
  }
});

module.exports = router; 