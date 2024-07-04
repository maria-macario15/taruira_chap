import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiHeart, BiChat } from "react-icons/bi";

function Post({ post }) {
    const [id, setId] = useState(null);
    const [comment_desc, setComment_desc] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoadingComments, setLoadingComments] = useState(true);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (post && post.id) {
            setId(post.id);
            fetchComments();
        }
    }, [post]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/post');
            setPosts(response.data);
        } catch (error) {
            console.error('Erro ao buscar posts:', error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comment?post_id=${id}`);
            setComments(response.data);
            setLoadingComments(false);
        } catch (error) {
            console.error("Erro ao buscar os comentários:", error);
        }
    };

    const handleLike = async () => {
        try {
            if (likedPosts.has(id)) {
                await axios.delete(`http://localhost:5000/api/likes/${id}`);
                likedPosts.delete(id);
            } else {
                await axios.post(`http://localhost:5000/api/likes`, { likes_post_id: id });
                likedPosts.add(id);
            }
            setLikedPosts(new Set(likedPosts));
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
                username: post.username,
                created_at: new Date().toISOString(),
            });
            const newComment = response.data;
            setComments([...comments, newComment]);
            setComment_desc("");
        } catch (error) {
            console.error("Erro ao enviar o comentário:", error);
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <div className="container">
            <div className="feed-container">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="post-content">
                            <p>{post.post_desc}</p>
                            {post.img && <img src={post.img} alt="Imagem do Post" />}
                        </div>
                        <div className="post-actions">
                            <button onClick={handleLike} className="like-button">
                                <BiHeart /> {likedPosts.has(post.id) ? "Descurtir" : "Curtir"}
                            </button>
                            <button onClick={toggleComments} className="comment-button">
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
                ))}
            </div>
        </div>
    );
}

export default Post;
