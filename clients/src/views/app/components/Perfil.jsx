import React, { useState, useEffect } from 'react';

const Perfil = ({ id }) => {
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
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`);
      const data = await response.json();
      if (data) {
        setUser({
          username: data.username,
          user_img: data.user_img,
          bio: data.bio
        });
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error.message);
    }
  };

  const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        setEditMode(false);
        fetchUserData(); // Atualiza os dados após a submissão
      } else {
        console.error('Erro ao atualizar perfil:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.message);
    }
  };

  return (
    <div className='row'>
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
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      ) : (
        <div className="profile-container">
          
          <div className="profile-photo">
            <img className='use' src={user.user_img ? user.user_img : defaultUserUrl} alt="User" />
          </div>
          <div className="user-info">
            <p className="nome-usuario">{user.username}</p>
          </div>
          <div className='p-3'>
            <h1 className='bio'>{user.bio}</h1>
          </div>
          <div className="edit-profile">
            <button className='bi bi-pen-fill name' onClick={() => setEditMode(true)}></button>
          </div>
          <div className="container">
            <button className="nomm" disabled> Perfil </button>
          </div>
          <br />
          <div className="post">
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
