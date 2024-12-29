const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./user.js');
const postRouter = require('./post.js');
const likeRouter = require('./like.js');
const messageRouter = require('./message.js');
const groupRouter = require('./group.js');
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const path = require('path');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/user', userRouter);
router.use('/posts', postRouter);
router.use('/likes', likeRouter);
router.use('/messages', messageRouter);
router.use('/groups', groupRouter);



module.exports = router;