import '../components/style.css';
import logo from '../../imgs/logo.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import { Offcanvas } from 'bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UploadComponent from './UploadComponent'; // Importa o novo componente de upload
import '../context/feedback.css'
import SearchComponent from '../context/procurar';
import FriendshipComponent from './bffs';
function Barra() {
    {/*feedback*/ }
    const [selectedRating, setSelectedRating] = useState('');

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const handleSendFeedback = () => {
        // Aqui você pode implementar a lógica para enviar o feedback
        console.log(`Feedback enviado: ${selectedRating}`);
    };
    {/*feedback*/ }

    const [user, setUser] = useState({
        id: '',
        email: '',
        username: '',
        user_img: '',
        bg_img: ''
    });

    const [selectedFile, setSelectedFile] = useState(null); // Define o estado de selectedFile

    const navigate = useNavigate();

    useEffect(() => {
        const value = localStorage.getItem("accessUser");
        if (value) {
            setUser(JSON.parse(value));
        }
    }, []);

    const handleNavigateToFeed = (event) => {
        event.preventDefault(); // Evita que o link recarregue a página
        navigate('/feed');
    };

    const [post, setPost] = useState({
        post_desc: '',
        img: '',
        username: user.username, // Assume o username do usuário logado
        user_img: user.user_img, // Assume a imagem do usuário logado
    });

    const handleSubmit = async (e) => { // Remove o segundo argumento `selectedFile`
        e.preventDefault();

        try {
            if (!selectedFile) {
                throw new Error("Nenhum arquivo selecionado");
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('post_desc', post.post_desc);
            formData.append('username', post.username);
            formData.append('user_img', post.user_img);

            const token = localStorage.getItem("accessToken");

            const response = await fetch('/upload', {
                method: 'POST',
                headers: {
                    'x-access-token': token
                },
                body: formData
            });

            if (response.ok) {
                const filename = await response.json();
                console.log('Arquivo enviado:', filename);
                // Lógica para lidar com o arquivo enviado, se necessário
                alert("Arquivo enviado com sucesso!");
                setPost({
                    post_desc: '',
                    img: '',
                    username: user.username,
                    user_img: user.user_img,
                });
                setSelectedFile(null); // Limpa selectedFile após o envio
            } else {
                throw new Error("Erro ao fazer upload do arquivo");
            }
        } catch (error) {
            console.error("Erro ao enviar o arquivo", error);
            alert("Erro ao enviar o arquivo. Por favor, tente novamente.");
        }
    };
   
    const defaultUserUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

    const handleFileSelect = (file) => {
        setSelectedFile(file); // Define selectedFile com o arquivo selecionado
    };

    return (
        <main className='container-fluid row '>

            <div className="justify-content-md-center text-center d-flex justify-content-around teste">
                <nav className="navbar navbar-light bg-body-light col">

                    {/*<img src={logo} width="10%" className='col-1' alt="Logo" />*/}


                    <Link to="/profile">
                        <img className='user' width="5%" src={user.user_img > 0 ? user.user_img : defaultUserUrl} alt="User" />
                        <p className='fw-semibold fs-4 '>{user.username}</p>
                    </Link>

                    <Link className="nav-link active bi bi-person" aria-current="page" href="/FriendshipComponent" > Amigos</Link>
                    <Link className="nav-link active bi bi-cursor" aria-current="page" href="/feed" onClick={handleNavigateToFeed}> Feed</Link>
                    <Link className="nav-link active bi bi-chat-left-dots" aria-current="page" href="conversa"> Conversas</Link>
                    <Link className="nav-link active  bi bi-people" aria-current="page" href="grupos"> Grupos</Link>
                    <Link className="nav-link active bi bi-emoji-smile" aria-current="page" data-bs-toggle="offcanvas" data-bs-target="#feedback" aria-controls="feedback"> Feedback</Link>
                    <Link className="nav-link active bi bi-box-arrow-right" aria-current="page" onClick={handleNavigateToFeed}> Sair</Link>


                    <button className="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#pesq" aria-controls="pesq">
                        <i className="bi bi-search"></i>
                    </button>


                </nav>
            </div>
            <button className="btn btn-outline-dark col-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <i className="bi bi-plus"></i>
            </button>

            {/* CRIAR POST */}
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="pesq" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Crie sua publicação</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <SearchComponent />
                </div>
            </div>



            {/* CRIAR POST */}
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Crie sua publicação</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <UploadComponent onFileSelect={handleFileSelect} /> {/* Passa handleFileSelect como prop para UploadComponent */}
                    <br />
                    <div className="image-preview">
                        {selectedFile ? (
                            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="image-preview__img" />
                        ) : (
                            <p>Nenhuma imagem selecionada</p>
                        )}
                    </div>
                
                    <button onClick={handleSubmit}>
                        Postar
                    </button>
                </div>
            </div>


            {/* CRIAR FEEDBACK*/}
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="feedback" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Crie sua publicação</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">


                    <div className="feedback-container">
                        <h1>Poderia nos avaliar? </h1>
                        <div className="ratings-container" onClick={(e) => handleRatingClick(e.target.textContent)}>
                            <div className={`rating ${selectedRating === 'Insatisfeita' ? 'active' : ''}`}>
                                <i className="bi bi-emoji-frown"></i>
                                <p>Insatisfeita</p>
                            </div>
                            <div className={`rating ${selectedRating === 'Neutra' ? 'active' : ''}`}>
                                <i className="bi bi-emoji-neutral"></i>
                                <p>Neutra</p>
                            </div>
                            <div className={`rating ${selectedRating === 'Ameii' ? 'active' : ''}`}>
                                <i className="bi bi-emoji-heart-eyes"></i>
                                <p>Ameii</p>
                            </div>
                        </div>
                        <textarea
                            className="form-control"
                            placeholder='O que você achou da nossa rede social?'

                        ></textarea>
                        <br />
                        <button className="btn" id="send" onClick={handleSendFeedback}>Enviar</button>

                        <div id="feedback">
                            <i className="fas fa-heart"></i>
                            <h2>Muito Obrigada!</h2>
                            <br />
                            <strong>Feedback: {selectedRating}</strong>
                        </div>
                    </div>
                </div>
            </div>


            {/* RODAPE */}
            <div className='row'>
                <footer className="bg-body-tertiary text-center border border-black rounded-4 fixarRodape col-4">

                    <strong className="text-light fw-semi">Taruíra Chapoca</strong><br />
                    <strong className="text-light fw-semi">Criado e desenvolvido por Júlio Basso e Maria Macario.</strong><br />
                    <strong className='text-light fw-semi'>@2024</strong>
                </footer>
            </div>
        </main>
    );
}

export default Barra;