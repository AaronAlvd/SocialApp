const express = require('express');
const { User, Group, GroupUser } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.user;
    const groups = await Group.findAll({ where: { userId: id }, attributes: ['groupId']});

  } catch(error) {
    next(error)
  }
});

module.exports = router;