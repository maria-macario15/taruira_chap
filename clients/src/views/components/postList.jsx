import React, { useEffect, useState } from 'react';
import Post from './post';
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <p>{post.post_desc}</p>
          {post.img && <img src={`http://localhost:3000${post.img}`} alt="Post" />}
        </div>
      ))}
    </div>
  );
};

export default PostList;
