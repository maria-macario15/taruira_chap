import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./comments";
import { BiHeart, BiChat } from "react-icons/bi";

function Post({ post }) {

    const [id, setId] = useState("");
    const [post_desc, setPost_desc] = useState("");
    const [img, setImg] = useState("");
    const [username, setUsername] = useState("");
    const [user_img, setUser_img] = useState("")
    const [created_at, setCreated_at] = useState("");
    const [comment_desc, setComment_desc] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoadingComments, setLoadingComments] = useState(true);
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(''); // Estado para o ID do usuário logado

    useEffect(() => {
        fetchPosts();
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/comment?post_id=${id}`);
                setComments(response.data);
                setLoadingComments(false);
            } catch (error) {
                console.error("Erro ao buscar os comentários:", error);
            }
        };

        fetchComments();
    }, [id]);



    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/post'); // Atualize a URL conforme necessário
            setPosts(response.data); // Define os posts recebidos do servidor
        } catch (error) {
            console.error('Erro ao buscar posts:', error.message);
        }
    };

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:5000/api/likes`, { likes_post_id: id });
            setLiked(!liked);
        } catch (error) {
            console.error("Erro ao curtir o post:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/comment`, {
                comment_desc,
                post_id: id,
                username: post.username, // Certifique-se de passar os dados necessários para o backend
                created_at: new Date().toISOString(),
            });
            const newComment = response.data;
            setComments([...comments, newComment]);
            setComment_desc("");
        } catch (error) {
            console.error("Erro ao enviar o comentário:", error);
        }
    };

    return (
        <div className="post-container">
            <div className="post-header">
                <img src={user_img} alt={username} className="profile-img" />
                <div>
                    <h2>{username}</h2>
                    <p className="post-date">{created_at}</p>
                </div>
            </div>
            <div className="post-body">
                <p>{post_desc}</p>
                {img && <img src={img} alt="Post" className="post-img" />}
            </div>
            <div className="post-actions">
                <button onClick={() => setLiked(!liked)} className="like-button">
                    <BiHeart /> {liked ? "Descurtir" : "Curtir"}
                </button>
                <button onClick={() => setShowComments(!showComments)} className="comment-button">
                    <BiChat /> {showComments ? "Ocultar Comentários" : "Comentários"}
                </button>
            </div>
            {showComments && (
                <div className="post-comments">
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input
                            type="text"
                            value={comment_desc}
                            onChange={(e) => setComment_desc(e.target.value)}
                            placeholder="Adicione um comentário..."
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">
                            <BiChat /> Comentar
                        </button>
                    </form>
                    {isLoadingComments ? (
                        <p>Carregando comentários...</p>
                    ) : comments.length > 0 ? (
                        <ul className="comment-list">
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment-item">
                                    <strong>{comment.username}</strong>: {comment.comment_desc}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Sem comentários ainda.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Post;
