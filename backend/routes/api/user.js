const express = require('express');
const { v4: uuid } = require('uuid');
const { User, Follow, Post, Like } = require('../../db/models');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validateSignup } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');


const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      attributes: ['firstName', 'lastName', 'username', 'email', 'profilePhoto', 'bio', 'backgroundPhoto']
    });

    const followers = await Follow.findAll({
      where: {
        followedId: id
      },
      attributes: ['followedId'],
    });

    const following = await Follow.findAll({
      where: {
        followerId: id
      },
      attributes: ['followerId'],
    });

    const posts = await Post.findAll({
      where: {
        userId: id
      }
    })

    let likes = 0;

    for (const post of posts) {
      const postLikes = await Like.findAll({
        where: {
          postId: post.id,
        },
      });
      likes += postLikes.length;
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
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

router.get('/following', async (req, res, next) => {
  try{
    const id = req.params.id;

    const following = await Follow.findAll({
      where: {
        followerId: id,
      },
      include: [
        {
          modal: User,
          as: 'Following',
          attributes: ['firstName', 'lastName', 'username', 'id']
        }
      ]
    })

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