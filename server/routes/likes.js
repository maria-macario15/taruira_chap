import express from "express";
import { addLikes, getLikes, deleteLikes } from "../controllers/likes.js"; // Importa funções do controlador de curtidas
import { checkToken } from "../middleware/tokenValidation.js"; // Importa middleware de validação de token

const router = express.Router(); // Cria uma instância de router do Express

// Rota POST para adicionar uma nova curtida
router.post("/",  addLikes);

// Rota GET para obter todas as curtidas de um post
router.get("/",  getLikes);

// Rota DELETE para remover uma curtida existente
router.delete("/",  deleteLikes);

export default router; 