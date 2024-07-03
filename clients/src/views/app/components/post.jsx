import { useState, useEffect } from "react";
import moment from "moment";
import 'moment/locale/pt-br';
import axios from "axios";
import Comments from "./comments";
import { FaThumbsUp, FaRegComment, FaPaperPlane } from "react-icons/fa";


function Post(props) {
    const { post } = props;
    const { id, post_desc, img, username, user_img, created_at } = post;
    const [comment_desc, setComment_desc] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showlikes, setShowLikes] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoadingLikes, setLoadingLikes] = useState(true);
    const [isLoadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        fetchLikes();
        fetchComments();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/likes/?likes_post_id=${id}`);
            setLikes(response.data.data);
            setLoadingLikes(false);
        } catch (error) {
            console.error("Error fetching likes:", error);
            setLoadingLikes(false);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comment/?post_id=${id}`);
            setComments(response.data.data);
            setLoadingComments(false);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setLoadingComments(false);
        }
    };

    const handleLikeClick = async () => {
        try {
            if (liked) {
                await axios.delete(`http://localhost:5000/api/likes/?likes_post_id=${id}&likes_user_id=${props.user.id}`);
                setLiked(false);
            } else {
                await axios.post(`http://localhost:5000/api/likes/`, { likes_user_id: props.user.id, likes_post_id: id });
                setLiked(true);
            }
            fetchLikes();
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            await axios.post(`http://localhost:5000/api/comment/`, { comment_desc, comment_user_id: props.user.id, post_id: id });
            setComment_desc('');
            fetchComments();
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const userImgSrc = user_img || "https://img.freepik.com/free-icon/user_318-159711.jpg";

    return (
        <div className="w-1/3 bg-white wounded-lg p-4 feeds">
            <header className="flex gap-2 pb-4 border-2 items-center">
                <img className="w-8 h-8 rounded-full" src={user_img ? user_img : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="imagem do usuario que fez o post" />
                <div className="flex flex-col">
                    <span className="font-semibold">{username}</span>
                    <span className="text-xs">{moment(created_at).fromNow()}</span>
                </div>
            </header>
            {post_desc && (
                <div className="py-4 w-full">
                    <span>{post_desc}</span>
                </div>
            )}
            {img && (
                <img className="rounded-lg" src={`./upload/${img}`} alt="imagem do post" />
            )}
            <div className="flex justify-between py-4 border-b">
                <div className="relative" onMouseEnter={() => setShowLikes(true)} onMouseLeave={() => setShowLikes(false)}>
                    <div className="flex gap-1 items-center">
                        <span className="bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs">
                            <FaThumbsUp />
                        </span>
                        <span>{likes.length}</span>
                    </div>
                    {showlikes && (
                        <div className="absolute bg-white border flex flex-col p-2 rounded-md top-6">
                            {likes.map((like) => (
                                <span key={like.id}>{like.username}</span>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={() => setShowComments(!showComments)}>
                    {comments.length > 0 ? `${comments.length} comentários` : 'Comentar'}
                </button>
            </div>
            <div className="flex justify-between py-4 text-gray-600 border-b">
                <button className={`flex items-center gap-1 ${liked ? "text-blue-600" : ""}`} onClick={handleLikeClick}>
                    <FaThumbsUp /> Curtir
                </button>
                <button className="flex items-center gap-1" onClick={() => document.getElementById(`comment${id}`)?.focus()}>
                    <FaRegComment /> Comentar
                </button>
            </div>
            {showComments && (
                <div>
                    {isLoadingComments ? (
                        <span>Carregando comentários...</span>
                    ) : (
                        comments.map((comment, idx) => (
                            <Comments key={idx} comment={comment} />
                        ))
                    )}
                </div>
            )}
            <div className="flex gap-4 pt-6">
                <img src={userImgSrc} alt="imagem do perfil" className="w-8 h-8 rounded-full" />
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                    <input
                        id={`comment${id}`}
                        type="text"
                        className="bg-zinc-100 w-full focus-visible:outline-none"
                        value={comment_desc}
                        onChange={(e) => setComment_desc(e.target.value)}
                        placeholder="Comente..."
                    />
                    <button onClick={handleCommentSubmit}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
