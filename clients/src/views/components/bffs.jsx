import React, { useState, useEffect } from 'react';

const FriendshipComponent = () => {
  const [followerId, setFollowerId] = useState('');
  const [followedId, setFollowedId] = useState('');
  const [friendships, setFriendships] = useState([]);

  useEffect(() => {
    if (followerId) {
      fetchFriendships();
    }
  }, [followerId]);

  const fetchFriendships = async () => {
    const response = await fetch(`http://localhost:5000/friendship?follower_id=${followerId}`);
    const data = await response.json();
    setFriendships(data);
  };

  const addFriendship = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/friendship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ follower_id: followerId, followed_id: followedId })
    });
    fetchFriendships();
    setFollowedId('');
  };

  const deleteFriendship = async (followedId) => {
    await fetch(`http://localhost:5000/friendship?follower_id=${followerId}&followed_id=${followedId}`, {
      method: 'DELETE'
    });
    fetchFriendships();
  };

  return (
    <div>
      <form onSubmit={addFriendship}>
        <input
          type="text"
          value={followerId}
          onChange={(e) => setFollowerId(e.target.value)}
          placeholder="Follower ID"
          required
        />
        <input
          type="text"
          value={followedId}
          onChange={(e) => setFollowedId(e.target.value)}
          placeholder="Followed ID"
          required
        />
        <button type="submit">Adicionar Amigo</button>
      </form>
      <h2>Friendships</h2>
      <ul>
        {friendships.map((friendship) => (
          <li key={friendship.followed_id}>
            <img src={friendship.user_img} alt={friendship.username} className="user-img" />
            {friendship.username}
            <button onClick={() => deleteFriendship(friendship.followed_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendshipComponent;
