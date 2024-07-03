import React, { useState } from 'react';

const EditProfile = ({ profile, onSave, onCancel }) => {
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [user_img, setUser_img] = useState(profile.user_img);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username, bio, user_img });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Name"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      ></textarea>
      <input
        type="file"
        value={user_img}
        onChange={(e) => setUser_img(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditProfile;
