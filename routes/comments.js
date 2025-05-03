const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// POST /api/comments - Add a new comment
router.post('/comments', async (req, res) => {
  const { commentorUsername, paperTitle, comment } = req.body;
  try {
    const newComment = new Comment({ commentorUsername, paperTitle, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/comments/:paperId - Get comments for a paper
router.get('/comments/:paperId', async (req, res) => {
  try {
    const comments = await Comment.find({ paperId: req.params.paperId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/comments/:commentId/upvote - Upvote a comment
router.post('/comments/:commentId/upvote', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.votes.upvotes += 1;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/comments/:commentId/downvote - Downvote a comment
router.post('/comments/:commentId/downvote', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.votes.downvotes += 1;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 