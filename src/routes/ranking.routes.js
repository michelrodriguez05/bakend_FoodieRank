import { Router } from "express";
import { getRanking_controller, getRankingRestaurante_controller } from "../controllers/ranking.controller.js";

const router = Router();

/**
 * GET /api/ranking?top=5
 * Devuelve el top N restaurantes según el score ponderado
 */
router.get("/", getRanking_controller);

/**
 * GET /api/ranking/:id
 * Devuelve el ranking (estadísticas + score) de 1 restaurante
 */
router.get("/:id", getRankingRestaurante_controller);

export default router;
