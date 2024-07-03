import React, { useState, useEffect } from 'react';

const ProfileComponent = ({ id}) => {
  const [user, setUser] = useState({
    username: '',
    user_img: '',
    bio: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:5000/user?id=${id}`);
    const data = await response.json();
    if (data.length > 0) {
      setUser(data[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...user, id: id })
    });
    setEditMode(false);
    fetchUserData();
  };

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="text"
            name="user_img"
            value={user.user_img}
            onChange={handleChange}
            placeholder="User Image URL"
            required
          />
          <input
            type="text"
            name="bio"
            value={user.bio}
            onChange={handleChange}
            placeholder="Fale de você, taruíra"
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
               
            <div className=" profile-container ">
                <a className="bi bi-pen-fill editar" onClick={() => setEditMode(true)}>Edit Profile</a>
                <div className="profile-photo">
                    <img className='' src={user.user_img} />
                </div>
                <div className="user-info">
                    <a className="nome-usuario">{user.username}</a>
                    <div className="bio">
                       
                    </div>
                </div>
                <br />
                <div className="">
                    <button type="button" class="bo_perfil " disabled> Perfil </button>
                </div>
                <br />
                <div className=" taru app-container">
                    </div>
                    </div>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
