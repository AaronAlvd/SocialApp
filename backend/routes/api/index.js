const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');
const path = require('path');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

module.exports = router;