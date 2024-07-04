import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL

export const createFeedback = (req, res) => {
    const { rating, feedback_text } = req.body;

    // Verifica se o feedback possui uma avaliação e texto
    if (!rating || !feedback_text) {
        return res.status(422).json({ msg: "É necessário fornecer uma avaliação e um texto de feedback!" });
    }

    // Insere o feedback na tabela 'feedback'
    db.query('INSERT INTO feedback SET ?', { rating, feedback_text }, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "Feedback enviado com sucesso!" });
        }
    });
};
