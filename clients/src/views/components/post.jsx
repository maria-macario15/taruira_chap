import React, { useState, useEffect } from 'react';

const Post = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let url = userId ? `http://localhost:5000/posts?id=${userId}` : 'http://localhost:5000/posts';
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div>
      <h2>Posts</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.post_id} className="post">
            <h3>{post.username}</h3>
            {post.img && <img src={post.img} alt="Post" className="post-img" />}
            <p>{post.post_desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
