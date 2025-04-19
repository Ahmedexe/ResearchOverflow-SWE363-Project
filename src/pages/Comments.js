import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Comments() {
  const { state } = useLocation();
  const article = state?.article;

  const [comments, setComments] = useState([
    { id: 1, username: "Alice", text: "Great paper! Very insightful.", votes: 10 },
    { id: 2, username: "Bob", text: "I think it needs more data to back up some claims.", votes: 3 }
  ]);

  const [replyVisible, setReplyVisible] = useState({});

  const toggleReply = (id) => {
    setReplyVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const voteUp = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, votes: comment.votes + 1 } : comment
      )
    );
  };

  const voteDown = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, votes: comment.votes - 1 } : comment
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 p-4 border rounded" style={{ minHeight: '300px' }}>
        {article ? (
          <>
            <h2 className="text-center">{article.title}</h2>
            <p className="text-center">{article.text}</p>
            <div className="text-center">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                View Full Paper
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center">Research Paper Title</h2>
            <p className="text-center">This is a placeholder for your research paper content. The design will be changed later.</p>
          </>
        )}
      </div>

      <div>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="card mb-3">
            <div className="card-header d-flex justify-content-between">
              <span>{comment.username}</span>
              <span>Votes: {comment.votes}</span>
            </div>
            <div className="card-body">
              <p className="card-text">{comment.text}</p>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-success" onClick={() => voteUp(comment.id)}>
                  Vote Up
                </button>
                <button type="button" className="btn btn-danger" onClick={() => voteDown(comment.id)}>
                  Vote Down
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => toggleReply(comment.id)}>
                  Reply
                </button>
              </div>
              {replyVisible[comment.id] && (
                <div className="mt-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Write your reply here..."
                  ></textarea>
                  <button type="button" className="btn btn-primary mt-2">
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
