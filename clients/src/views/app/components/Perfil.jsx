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
      const response = await fetch(`http://localhost:5000/api/users/?id=${id}`);
      const data = await response.json();
      if (data.length > 0) {
        setUser(data[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error.message);
    }
  };

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
      await fetch('http://localhost:5000/api/users/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...user, id: id })
      });
      setEditMode(false);
      fetchUserData(); // Atualiza os dados após a submissão
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.message);
    }
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
          <button type="submit">Salvar</button>
        </form>
      ) : (
        <div className="profile-container">
          <div className="edit-profile">
            <button onClick={() => setEditMode(true)}>Editar Perfil</button>
          </div>
          <div className="profile-photo">
            <img className="" src={user.user_img} alt="Imagem do perfil" />
          </div>
          <div className="user-info">
            <p className="username">{user.username}</p>
            <div className="bio">{user.bio}</div>
          </div>
          <br />
          <div className="perfil">
            <button type="button" className="perfil" disabled> Perfil </button>
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
