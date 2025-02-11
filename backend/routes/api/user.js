const express = require('express');
const { v4: uuid } = require('uuid');
const { User, Follow, Post, PostLike, GroupUser, Group, FollowingQueue } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validateSignup } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');

const router = express.Router();

router.get('/search/following/:query', requireAuth, async (req, res, next) => {
  try{
    const id = req.user.id;
    const { query } = req.params;

    const searchResults = await User.findAll({
      where: {
        username: { [Op.like]: `${query}%` }
      },
      attributes: ['id', 'firstName', 'lastName', 'profilePhoto', 'username'],
      include: [
        {
          model: Follow,
          as: 'Followed',
          where: {
            followerId: id,
          },
          required: true,
        }
      ]
    });

    res.json(searchResults)

  } catch(error) {
    next(error)
  }
});

router.get('/search/:query', requireAuth, async (req, res, next) => {
  try {
    const { query } = req.params;

    if (!query) {
      throw { status: 400, title: 'Invalid Request', message: 'Search query can not be blank'}
    };

    const users = await User.findAll({
      where: {
        username: { [Op.like]: query }
      }, 
      attributes: ['id', 'username', 'profilePhoto', 'firstName', 'lastName'],
    });

    if (users.length === 0) throw { status: 404, title: 'Resource Not Found', message: 'User not found'}

    res.status(200).json(users)

  } catch (error) {
    next(error)
  }
});

router.get('/explore/:query', requireAuth, async (req, res, next) => {
  try {
    const { query } = req.params;

    const queryResults1 = await User.findAll({
      where: {
        [Op.or]: [
          {
            username: { [Op.like]: `${query}%` }  // Match usernames starting with `query`
          },
          {
            firstName: { [Op.like]: `${query}%` }  // Match firstName starting with `query`
          },
          {
            lastName: { [Op.like]: `${query}%` }  // Match lastName starting with `query`
          }
        ]
      }
    });

    const queryResults2 = await Group.findAll({
      where: {
        groupName: {
          [Op.like]: `${query}%`
        }
      }
    });

    if (queryResults1 === 0 && queryResults2.length === 0) {
      throw {status: 404, title: 'Resource Not Found', message: 'No matches found'}
    }

    res.json({
      users: queryResults1,
      groups: queryResults2,
    })

  } catch(error) {
    next(error);
  }
});

router.get('/posts/:id', requireAuth, async (req, res, next) => {
  try{
    const userId = req.user.id;
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: ['status']});

    if (!user) {
      throw { status: 404, title: 'Resource Not Found', message: 'User not found' };
    }
    
    if (user.status === 'public') {
      const posts = await Post.findAll({ where: { userId: id }, attributes: ['id', 'userId', 'caption', 'photo']});
      return res.json(posts)
    }

    const isFollowing = await Follow.findAll({ where: { followedId: id, followerId: userId }});

    if (isFollowing.length > 0) {
      const posts = await Post.findOne({ where: { userId: id }, attributes: ['id', 'userId', 'caption', 'photo']});
      return res.json(posts)
    }

    throw { status: 403, title:'Forbidden', message: 'This account is private'};

  } catch (error) {
    next(error)
  }
});

router.get('/following/:id', requireAuth, async (req, res, next) => {
  try{
    const id = req.params.id;

    const following = await Follow.findAll({where: { followerId: id }, attributes: ['followedId']});
    let users = new Array(following.length);

    for (let i = 0; i < following.length; i++) {
      const data = await User.findByPk(following[i].followedId, { attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhoto']})
      users[i] = data
    }

    res.json(users)
  } catch(error) {
    next(error)
  }
});

router.get('/groups', requireAuth, async (req, res, next) => {
 try{
  const userId = req.user.id;
  const groups = await GroupUser.findAll({
    where: { userId },
    include: [
      {
        model: Group,
        attributes: ['id', 'groupName', 'profilePhoto']
      }
    ]
  });

  if (groups.length === 0) {
    res.status(200)
  }

  return res.json(groups);

 } catch(error) {
  next(error);
 }
});

router.get('/following', requireAuth, async (req, res, next) => {
  try{
    const id = req.user.id;

    const following = await Follow.findAll({ 
      where: { followerId: id },
      include: [
        {
          model: User,
          as: 'Follower',
          attributes: ['id','firstName', 'lastName', 'username', 'profilePhoto']
        }
      ]
    });

    res.json(following)

  } catch(error) {
    next(error)
  }
});

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ id: id },{ username: id }]
      }, 
      attributes: ['id', 'firstName', 'lastName', 'username', 'profilePhoto',  'status', 'backgroundPhoto', 'bio'],
    });

    if (!user) {
      throw { status: 404, title: 'Resource Not Found', message: 'The requested resource was not found'}
    }

    const isFollower = await Follow.findOne({ where: { followingId: user.id, followerId: userId }});

    if (isFollower && user.status !== 'public' && user.id !== userId) {
      const followers = await Follow.count({ where: { followingId: user.id }});
      const following = await Follow.count({ where: { followerId: user.id }});
      const posts = await Post.findAll({ where: { userId: user.id }});

      let likes = 0;
      
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const add = await PostLike.count({ where: { postId: post.id }});
        likes+= add;
      }

      return res.json({
              ...user.dataValues,
              followers: followers,
              following: following,
              posts: posts.length,
              likes: likes,
             });
    }

    const followers = await Follow.count({ where: { followingId: user.id }});
    const following = await Follow.count({ where: { followerId: user.id }});
    const posts = await Post.findAll({ where: { userId: user.id, groupId: 'public' }});
    let likes = 0;
      
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const add = await PostLike.count({ where: { postId: post.id }});
      likes+= add;
    }

    return res.json({
              ...user.dataValues,
              followers: followers,
              following: following,
              posts: posts.length,
              likes: likes,
            });

  } catch(error) {
    next(error)
  }
});

router.post('/follow/:userId', requireAuth, async (req, res, next) => {
  try {
    const id = uuid()
    const userId = req.user.id;
    const followingId = req.params.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      throw {status: 404, title: 'Resource Not Found', error: 'User could not be found.'}
    }

    if (user.status === 'public') {
      const followUser = Follow.create({
        id: id,
        followingId: followingId,
        followerId: userId,
      });

      res.json({
        title: 'Successful',
        message: `You are now follwing ${user.username}`
      });

    } else {
      const followQueue = FollowingQueue.create({
        id: id,
        userId: followingId,
        requestFrom: userId
      });

      res.status().json({
        title: 'Pending',
        message: `Request to follow ${user.username} pending.`
      });
    }

  } catch(error) {
    next(error)
  }
});

router.post('/', validateSignup, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const usernameExist = await User.findOne({ where: { username: username.toLowerCase() }});
    const emailExist = await User.findOne({ where: { email }});

    if (usernameExist || emailExist ) {
      const err = new Error('Email or Username is already in use');
      err.status(400);
      err.errors = { email: 'Email or Username is already in use'};
      return(err)
    }

    const uniqueId = uuid();
    const hashedPassword = bcrypt.hashSync(password);

    const newUser = await User.create({
      id: uniqueId,
      firstName,
      lastName,
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
    });

    const safeUser = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username.toLowerCase(),
    };

    await setTokenCookie(res, safeUser);

    res.status(201).json({...safeUser, message: `Welcome, ${firstName}`});
  } catch(error) {
    next(error);
  }
});

router.delete('/follow/:userId', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const followingId = req.params.userId;

    const data = await Follow.destroy({
      where: {
        followingId: followingId,
        followerId: userId,
      }
    });

    res.json({ title: 'Successful' })

  } catch (error) {
    next(error)
  }
})

module.exports = router;