const express = require('express');
const { v4: uuid } = require('uuid');
const { PostLike } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    const id = uuid();

    const newLike = await PostLike.create({ id, userId, postId});

    res.json(newLike);

  } catch(error) {
    next(error);
  }
});

router.delete('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    
    const unlike = await PostLike.destroy({ where: { userId, postId }})

    res.json(unlike);

  } catch(error) {
    next(error);
  }
});

module.exports = router;