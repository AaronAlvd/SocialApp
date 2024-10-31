const express = require('express');
const { Post, Comment, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/current', requireAuth, (req, res, next) => {
  try {

  } catch(error) {
    next(error);
  }
})

router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params

    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          attributes: ['userId', 'comment', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['username', 'id']
            }
          ]
        }
      ]
    });

    if (!post) {
      return res.status(404).json({
        message: "Post could not be found"
      })
    }

    res.status(200).json(post);

  } catch(error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {

  } catch(error) {
    next(error);
  }
});

module.exports = router; 