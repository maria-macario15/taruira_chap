// src/components/CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ postId, onComment }) => {
  const [commentDesc, setCommentDesc] = useState('');

  const handleInputChange = (event) => {
    setCommentDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onComment(commentDesc);
    setCommentDesc('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Digite seu comentário..."
        value={commentDesc}
        onChange={handleInputChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CommentForm;
