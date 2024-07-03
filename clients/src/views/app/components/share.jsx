import React, { useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import axios from "axios";

function Share() {
    const [post_desc, setDesc] = useState("");
    const [img, setImg] = useState(null);

    const userImgSrc = "https://img.freepik.com/free-icon/user_318-159711.jpg"; // URL padrão da imagem do usuário ou outra fonte

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', img);
            const res = await axios.post('http://localhost:5000/api/upload/', formData);
            return res.data.imgUrl; // Assumindo que a resposta da API inclui uma propriedade 'imgUrl'
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            throw error; // Lança o erro para que ele possa ser tratado pelo SharePost
        }
    };

    const SharePost = async () => {
        try {
            let imgurl = "";
            if (img) {
                imgurl = await upload();
            }

            const newPost = {
                post_desc,
                img: imgurl,
                userId: 1  // Substitua pelo ID do usuário logado, se disponível
            };

            const response = await axios.post("http://localhost:5000/api/post/", newPost);

            if (response.status === 200) {
                setDesc('');
                setImg(null);
                alert('Post enviado com sucesso!');
            } else {
                throw new Error('Erro ao enviar o post');
            }
        } catch (error) {
            console.error('Erro ao criar o post:', error);
            alert('Erro ao enviar o post. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md flex flex-col gap-3">
            {img && <img className="rounded-lg" src={URL.createObjectURL(img)} alt="Imagem do post" />}
            <div className="flex gap-4 pt-6">
             
                <div className="w-full bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                    
                </div>
            </div>
            <div className="flex justify-between py-4 text-gray-600 border-y">
                <input
                    className="hidden"
                    type="file"
                    id="img"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="img" className="flex items-center gap-1">
                    <TbPhoto className="text-2xl" /> Adicionar Imagem
                </label>
            
            <input
                        type="text"
                        placeholder={`No que você está pensando, Taruíra?`}
                        value={post_desc}
                        className="bg-zinc-100 w-full focus-visible:outline-none"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <button onClick={SharePost}>
                        <FaPaperPlane />
                    </button>
                    </div>
        </div>
    );
}

export default Share;
