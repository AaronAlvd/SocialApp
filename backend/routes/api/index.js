const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./user.js');
const postRouter = require('./post.js');
const likeRouter = require('./like.js');
const messageRouter = require('./message.js');
const groupRouter = require('./group.js');
const { restoreUser } = require('../../utils/auth.js');
const path = require('path');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/likes', likeRouter);
router.use('/message', messageRouter);
router.use('/group', groupRouter);



module.exports = router;