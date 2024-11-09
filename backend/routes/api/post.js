const express = require('express');
const { Post, Comment, User, Follow, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/following', requireAuth, async (req, res, next) => {
  try {
    const posts = [];
    const userId = req.user.id;

    const following = await Follow.findAll({
      where: { followerId: userId },
    });

    const myPosts = await Post.findAll({ 
      where:{ userId: userId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'username']
        },
        {
          model: Like,
          attributes: ['postId', 'userId']
        }
      ]
    })

    myPosts.forEach((post) => posts.push(post));

    for (let data of following) {
      const post = await Post.findAll({ 
        where: { userId: data.followedId },
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName', 'username']
          }
        ]
      });
      
      if (post) {
        posts.push(post)
      }
    }

    res.send(posts.flat());

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