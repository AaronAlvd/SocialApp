const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Post, PostLike, Follow, FollowingQueue, Comment } = require('../../db/models');
const path = require('path');
const { validateLogin } = require('../../utils/validation');

const router = express.Router();


router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            profilePhoto: user.profilePhoto,
            bio: user.bio,
            status: user.status,
        };
        return res.json({ user: safeUser });
    } else {
        return res.json({ user: null });
    }
});

router.get('/notifications', requireAuth, async (req, res, next) => {
  try {
    const id = req.user.id;

    const posts = await Post.findAll({ 
      where: {
        userId: id,
      },
      attributes: [],
      include: [
        {
          model: PostLike,
          as: 'Likes',
          attributes: ['id', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhoto']
            },
            {
              model: Post,
              as: 'Likes',
              attributes: ['id']
            }
          ]
        },
        {
          model: Comment,
          attributes: ['id', 'userId', 'postId', 'comment', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhoto']
            },
          ]
        }
      ]
    });

    let followNotifications;

    if (req.user.status === 'public') {
      followNotifications = await Follow.findAll({
        where: {
          followingId: id,
        },
        attributes: ['id','createdAt'],
        include: [
          {
            model: User,
            as: 'Follower',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePhoto'],
          },
        ]
      });
    } else {
      followNotifications = await FollowingQueue.findAll({ 
        where: {
          userId: id,
        },
        attributes: ['id', 'createdAt'],
        include: [
          {
            model: User,
            as: 'secondary',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePhoto']
          }
        ]
      })
    }

    if (posts.length === 0 && followNotifications.length === 0) {
       return res.json({
        message: 'No new notifications'
      })
    } 

    let notifs1 = [];
    let notifs2 = [];

    posts.forEach(post => {
      const likes = post.Likes
      const comments = post.Comments
      likes.forEach(like => {
        notifs1.push({
          id: like.id,
          createdAt: like.createdAt,
          User: like.User,
          Post: like.Likes,
          type: 'like'
        })
      })
      comments.forEach(comment => {
        notifs1.push({
          id: comment.id,
          createdAt: comment.createdAt,
          userId: comment.userId,
          postId: comment.postId,
          comment: comment.comment,
          User: comment.User,
          type: 'comment'
        })
      })
    })

    if (followNotifications.length > 1) {
      followNotifications.forEach(data => {
        notifs2.push({
          id: data.id,
          createdAt: data.createdAt,
          User: data.User,
        })
      })
    }

    const orderedNotifs = [...notifs1, ...notifs2].sort((a, b) => b.createdAt - a.createdAt);

    res.json(orderedNotifs);

  } catch(error) {
    next(error);
  }
});

router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
      where: {
          [Op.or]: {
              username: credential,
              email: credential
          }
      }
  });

  if (!user || (password !== user.password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
  }

  const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
});

router.put('/', requireAuth, async (req, res, next) => {
  try {
    const id = req.user.id;
    const { username, firstName, lastName, email, bio } = req.body;

    const user = await User.findByPk(id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.username = username;
      user.email = email;
      user.bio = bio;
    }

    await user.save();

    res.json(user);

  } catch (error) {
    next(error);
  }
});

router.delete('/delete', requireAuth, async (req, res, next) => {
  try {
    const id = req.user.id;

    const deleteAccount = User.destroy({ where: { id }});

    res.clearCookie('token');
    return res.json({ message: 'success' });

  } catch (error) {
    next(error)
  }
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

module.exports = router;