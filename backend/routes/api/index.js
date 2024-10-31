const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./user.js');
const postRouter = require('./post.js');
const { restoreUser } = require('../../utils/auth.js');
const path = require('path');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);

module.exports = router;