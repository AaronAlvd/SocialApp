const express = require('express');
const { v4: uuid } = require('uuid');
const { Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId, commentId } = req.body;
    const id = uuid();

    const newLike = await Like.create({ id, userId, postId, commentId});

    res.json(newLike);

  } catch(error) {
    next(error);
  }
});

router.delete('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    
    const unlike = await Like.destroy({ where: { userId, postId }})

    res.json(unlike);

  } catch(error) {
    next(error);
  }
});

module.exports = router;