const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentorUsername: { type: String, required: true },
  paperId: { type: String, required: true },
  paperTitle: { type: String, required: true },
  votes: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema); 