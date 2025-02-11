const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
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
        };
        return res.json({ user: safeUser });
    } else {
        return res.json({ user: null });
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