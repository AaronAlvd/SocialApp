const express = require('express');
const { User, Comment, CommentLike, Post } = require('../../db/models');
const { v4: uuid } = require('uuid');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();

router.get('/post/:postId', requireAuth, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const comments = await Comment.findAll({
      where: {
        postId: postId
      },
      attributes: ['id', 'postId', 'comment', 'createdAt', 'userId'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'profilePhoto']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    if (!comments) {
      throw {status: 404, title: 'Resource Not Found', message: 'Post Not Found'}
    }

    res.json(comments);
  } catch(error) {
    next(error)
  }
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { comment, postId } = req.body;
    const id = uuid();

    const createComment = await Comment.create({ id, comment, postId, userId});

    res.status(201).json(createComment);

  } catch(error) {
    next(error)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const comment_id = req.params.id; 
    const user_id = req.user.id;
    const comment = await Comment.findByPk(comment_id);

    if (comment.length === 0) {
      throw {status: 404, title: 'Resource Not Found', message: 'Comment not found'}
    }

    const post = await Post.findByPk(comment.postId);

    if (user_id !== comment.userId && post.userId !== user_id && groupPost.userId !== user_id) {
      throw {status: 401, title: 'Unauthorized', message: 'You are not authorized to delete this comment'}
    }

    const delete_comment = await Comment.destroy({ where: { id: comment_id }});
    
    res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;