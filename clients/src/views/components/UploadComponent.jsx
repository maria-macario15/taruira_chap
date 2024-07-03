import React, { useState } from 'react';

const AddPost = () => {
  const [post_desc, setPost_desc] = useState('');
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setImageUrl(data.imageUrl);
    setImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post_desc.length <= 150) {
      await fetch('http://localhost:5000/posts/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_desc, img: imageUrl })
      });
      setPost_desc('');
      setImg(null);
      setImageUrl('');
    } else {
      alert('Text should be 150 characters or less');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="file"
        onChange={handleImageUpload}
      />


      <textarea
      className='form-control'
        value={post_desc}
        onChange={(e) => setPost_desc(e.target.value)}
        placeholder="Se expresse, taruíra, bote pra pocar! (max 150 characters)"
        maxLength="150"
      ></textarea>
      {imageUrl && <img src={`http://localhost:5000${imageUrl}`} alt="Upload Preview" />}
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
