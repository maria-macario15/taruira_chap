import express from "express";
import { createFeedback } from '../controllers/feedback.js';

const router = express.Router(); // Cria uma instância de router do Express

// Rota para salvar o feedback
router.post('/', createFeedback);

export default router;
