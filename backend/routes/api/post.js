const express = require('express');
const { Post, Comment, User, Follow } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/following', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const following = await Follow.findAll(
      { 
        where: { followerId: id },
        include: [
          {
            model: User,
            as: 'Followed',
            attributes: ['firstName', 'lastName', 'username'],
            include: [
              { model: Post, attributes: ['caption', 'photo']}
            ]
        }
      ]
    })

    res.status(200).json(following)

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