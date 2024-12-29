const express = require('express');
const { v4: uuid } = require('uuid');
const { User, Follow, Post, Like } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validateSignup } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');
const router = express.Router();

router.get('/:id/posts', requireAuth, async (req, res, next) => {
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

router.get('/:id/following', requireAuth, async (req, res, next) => {
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
      limit: 20,
    });

    if (users.length === 0) throw { status: 404, title: 'Resource Not Found', message: 'User not found'}

    res.status(200).json(users)

  } catch (error) {
    next(error)
  }
});

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      attributes: ['firstName', 'lastName', 'username', 'profilePhoto',  'status', 'backgroundPhoto'],
    });

    if (!user) {
      throw { status: 404, title: 'Resource Not Found', message: 'The requested resource was not found'}
    }

    const followers = await Follow.count({ where: { followedId: id }});
    const following = await Follow.count({ where: { followerId: id }});
    const posts = await Post.findAll({ where: { userId: id }});

    let likes;
    
    for (const post of posts) {
      likes += await Like.count({ where: { postId: post.id }});
    }

    res.json({
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

    res.status(201).json(safeUser);
  } catch(error) {
    next(error);
  }
});

module.exports = router;