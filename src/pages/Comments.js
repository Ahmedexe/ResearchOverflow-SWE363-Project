import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaComment, FaReply } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

// Comment component to handle individual comments and their replies
const CommentItem = ({ comment, voteUp, voteDown, addReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      addReply(comment._id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="h6 mb-0">
            <strong>{comment.commentorUsername}</strong>
          </Card.Title>
          <small className="text-muted">
            {new Date(comment.createdAt).toLocaleDateString()}
          </small>
        </div>
        <Card.Text className="mb-3">{comment.comment}</Card.Text>
        <div className="d-flex align-items-center mb-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2 d-flex align-items-center"
            onClick={() => voteUp(comment._id)}
          >
            <FaArrowUp className="me-1" />
            {comment.votes?.upvotes || 0}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-2 d-flex align-items-center"
            onClick={() => voteDown(comment._id)}
          >
            <FaArrowDown className="me-1" />
            {comment.votes?.downvotes || 0}
          </Button>
          {/*<Button
            variant="link"
            size="sm"
            className="text-decoration-none"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <FaReply className="me-1" />
            Reply
          </Button>*/}
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <div className="ps-3 mb-3">
            <Form.Control
              as="textarea"
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="mb-2 shadow-sm"
            />
            <div className="d-flex">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitReply}
                className="me-2"
              >
                Post Reply
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Render replies if any */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ps-4 mt-3 border-start">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                voteUp={voteUp}
                voteDown={voteDown}
                addReply={addReply}
              />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};



export default function Comments() {
  const { state } = useLocation();
  const article = state?.article;
  const paperTitle = article?.title;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (paperTitle) {
      console.log('Paper title:', paperTitle); // Debugging line
      fetchComments(paperTitle);
    } else {
      setLoading(false);
    }
  }, [paperTitle]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Optional fallback: redirect or show error
      setUser(null);
    }
  }, []);

  const fetchComments = async (paperTitle) => {
    setLoading(true);
    try {
      console.log('before fetching:', paperTitle); // Debugging line
      const res = await axios.get(`http://localhost:5000/api/comments`, {
        params: { paperTitle }
      });
      console.log('Fetched comments from DB:', res.data); // Debugging line
      setComments(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/comments', {
        commentorUsername: user.fname + " " + user.lname, // You might want to replace this with actual user data
        paperTitle: article.title,
        comment: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to post comment. Please try again.');
    }
  };

  const handleAddReply = async (parentId, replyText) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${parentId}/reply`, {
        commentorUsername: user.fname + " " + user.lname, // Replace with actual user
        comment: replyText,
      });

      // Update comments state with the new reply
      const updateCommentsWithReply = (commentsArray, parentId, newReply) => {
        return commentsArray.map(comment => {
          if (comment._id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            };
          } else if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentsWithReply(comment.replies, parentId, newReply)
            };
          }
          return comment;
        });
      };

      setComments(updateCommentsWithReply(comments, parentId, res.data));
    } catch (err) {
      console.error('Error adding reply:', err);
      setError('Failed to post reply. Please try again.');
    }
  };

  const voteUp = async (commentId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${commentId}/upvote`);

      // Update the comment with new vote count
      const updateCommentsWithVote = (commentsArray, commentId, updatedComment) => {
        return commentsArray.map(comment => {
          if (comment._id === commentId) {
            return updatedComment;
          } else if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentsWithVote(comment.replies, commentId, updatedComment)
            };
          }
          return comment;
        });
      };

      setComments(updateCommentsWithVote(comments, commentId, res.data));
    } catch (err) {
      console.error('Error upvoting:', err);
    }
  };

  const voteDown = async (commentId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${commentId}/downvote`);

      // Update the comment with new vote count
      const updateCommentsWithVote = (commentsArray, commentId, updatedComment) => {
        return commentsArray.map(comment => {
          if (comment._id === commentId) {
            return updatedComment;
          } else if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentsWithVote(comment.replies, commentId, updatedComment)
            };
          }
          return comment;
        });
      };

      setComments(updateCommentsWithVote(comments, commentId, res.data));
    } catch (err) {
      console.error('Error downvoting:', err);
    }
  };

  return (
    <>
      <Navbar />

      <Container fluid className="py-4">

        <div className="d-flex">
          <div className="me-4">
            <Sidebar />
          </div>

          <div className="flex-grow-1">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                {article ? (
                  <>
                    <Card.Title className="text-center h3 mb-3">{article.title}</Card.Title>
                    <Card.Text className="text-center mb-4">{article.text}</Card.Text>
                    <div className="text-center">
                      <Button
                        variant="outline-primary"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Full Paper
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Card.Title className="text-center h3 mb-3">Research Paper Title</Card.Title>
                    <Card.Text className="text-center">
                      This is a placeholder for your research paper content. The design will be changed later.
                    </Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">
                  <FaComment className="me-2" />
                  Comments
                </h3>
              </Card.Header>
              <Card.Body>
                <Form className="mb-4">
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="shadow-sm"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleAddComment}
                    className="shadow-sm"
                  >
                    Post Comment
                  </Button>
                </Form>

                {/* Error message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {/* Loading state */}
                {loading ? (
                  <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading comments...</p>
                  </div>
                ) : comments.length > 0 ? (
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <CommentItem
                        key={comment._id}
                        comment={comment}
                        voteUp={voteUp}
                        voteDown={voteDown}
                        addReply={handleAddReply}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center my-4">
                    <p className="text-muted">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}