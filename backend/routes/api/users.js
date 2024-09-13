const express = require('express');
const uuid = require('uuid');
const { User } = require('../../db/models');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post('/', validateSignup, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const usernameExist = await User.findOne({ where: { username }});
    const emailExist = await User.findOne({ where: { email }});

    if (usernameExist || emailExist ) {
      const err = new Error('Email or Username is already in use');
      err.status(400);
      err.errors = { email: 'Email or Username is already in use'};
      return(err)
    }

    const uniqueId = uuidv4();
    const hashedPassword = bcrypt.hashSync(password);

    const newUser = await User.create({
      id: uniqueId,
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201);
  } catch(error) {
    next(error);
  }
});

module.exports = router;