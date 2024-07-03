import React, { useState, useEffect } from 'react';
import './style.css'; // Importe o arquivo de estilos CSS
import axios from 'axios';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(''); // Estado para o ID do usuário logado

    useEffect(() => {
        fetchPosts();
        // Simulação de usuário logado - ajuste conforme sua lógica de autenticação
        
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/post'); // Atualize a URL conforme necessário
            setPosts(response.data); // Define os posts recebidos do servidor
        } catch (error) {
            console.error('Erro ao buscar posts:', error.message);
        }
    };

    const likePost = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/likes`, { likes_user_id: userId, likes_pos_id: postId });
            console.log('Curtido o post com sucesso:', response.data);
            // Atualiza os posts após curtir
            await fetchPosts();
        } catch (error) {
            console.error('Erro ao curtir o post:', error.message);
        }
    };

    const showComments = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comment?post_id=${postId}`);
            console.log('Comentários do post:', response.data);
            // Implemente a lógica para exibir os comentários na interface
        } catch (error) {
            console.error('Erro ao buscar comentários:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="feed-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-content">
                            <p>{post.post_desc}</p>
                            {post.img && <img src={post.img} alt="Imagem do Post" />}
                        </div>
                        <div className="post-actions">
                            <button onClick={() => likePost(post.id)}>Curtir</button>
                            <button onClick={() => showComments(post.id)}>Ver Comentários</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
