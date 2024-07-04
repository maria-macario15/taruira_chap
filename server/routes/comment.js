import express from "express";
import { creatComment, getComment } from "../controllers/comment.js"; // Importa funções do controlador de comentários

const router = express.Router(); // Cria uma instância de router do Express

// Rota POST para criar um novo comentário
router.post("/",  creatComment);

// Rota GET para obter todos os comentários de um post
router.get("/",  getComment);

export default router;