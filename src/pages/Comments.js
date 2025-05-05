import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';



export default function Comments() {
  const { state } = useLocation();
  // const paperTitle = state?.paperTitle;
  const article = state?.article;
  const paperTitle = article?.title

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyVisible, setReplyVisible] = useState({});

  useEffect(() => {
    if (paperTitle) {
      console.log('Paper title:', paperTitle); // Debugging line
      fetchComments(paperTitle);
    }
  }, [paperTitle]);

  const fetchComments = async (paperTitle) => {
    try {
      console.log('before fetching:', paperTitle); // Debugging line
      const res = await axios.get(`http://localhost:5000/api/comments`, {
        params: { paperTitle }
      });
      console.log('Fetched comments from DB:', res.data); // Debugging line
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post('http://localhost:5000/api/comments', {
        commentorUsername: 'currentUser',
        paperTitle: article.title,
        comment: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const voteUp = async (commentId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${commentId}/upvote`);
      setComments(comments.map(comment => comment._id === commentId ? res.data : comment));
    } catch (err) {
      console.error('Error upvoting:', err);
    }
  };

  const voteDown = async (commentId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${commentId}/downvote`);
      setComments(comments.map(comment => comment._id === commentId ? res.data : comment));
    } catch (err) {
      console.error('Error downvoting:', err);
    }
  };

  const toggleReply = (id) => {
    setReplyVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container className="py-4">
      <Navbar />
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

          <div className="comments-list">
            {comments.map((comment) => (
              <Card key={comment._id} className="mb-3 shadow-sm">
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
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2 d-flex align-items-center"
                      onClick={() => voteUp(comment._id)}
                    >
                      <FaArrowUp className="me-1" />
                      {comment.votes.upvotes}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2 d-flex align-items-center"
                      onClick={() => voteDown(comment._id)}
                    >
                      <FaArrowDown className="me-1" />
                      {comment.votes.downvotes}
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-decoration-none"
                      onClick={() => toggleReply(comment._id)}
                    >
                      Reply
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
