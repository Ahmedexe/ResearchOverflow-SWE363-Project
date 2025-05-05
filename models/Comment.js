const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentorUsername: { type: String, required: true },
  paperTitle: { type: String },
  comment: { type: String, required: true },
  votes: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema); 