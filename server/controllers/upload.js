import multer from "multer"; // Importa a biblioteca multer para lidar com upload de arquivos

// Configuração do local e nome do arquivo de destino para o upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../clients/public/upload"); // Define o diretório de destino onde os arquivos serão armazenados
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname); // Define o nome do arquivo de destino (timestamp + nome original do arquivo)
    }
});

// Configuração do middleware multer com as opções de armazenamento definidas anteriormente
export const upload = multer({ storage: storage });

// Controlador para lidar com a requisição de upload de arquivo
export const uploadController = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ msg: "Nenhum arquivo enviado!" });
    }

    res.status(200).json({ filename: file.filename });
};