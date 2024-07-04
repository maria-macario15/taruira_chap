import express from "express";
import { addFriendShip, getFriendShip, deleteFriendShip } from "../controllers/friendShip.js"; // Importa funções do controlador de amizade
import { checkToken } from "../middleware/tokenValidation.js"; // Importa middleware de validação de token

const router = express.Router(); // Cria uma instância de router do Express

// Rota POST para adicionar uma nova amizade
router.post("/",  addFriendShip);

// Rota GET para obter todas as amizades de um usuário
router.get("/",  getFriendShip);

// Rota DELETE para remover uma amizade existente
router.delete("/", deleteFriendShip);

export default router; 