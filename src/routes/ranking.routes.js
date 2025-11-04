import { Router } from "express";
import { getRanking_controller, getRankingRestaurante_controller } from "../controllers/ranking.controller.js";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/ranking:
 * get:
 * tags:
 * - Ranking
 * summary: Obtener el ranking general de restaurantes
 * description: "Devuelve una lista de restaurantes ordenados por su score ponderado."
 * parameters:
 * - in: query
 * name: top
 * schema:
 * type: integer
 * description: "Define cuántos restaurantes devolver (ej. 5, 10). Default: 10."
 * responses:
 * '200':
 * description: Lista del ranking
 * /api/v1/ranking/{id}:
 * get:
 * tags:
 * - Ranking
 * summary: Obtener el score de un restaurante
 * description: "Devuelve el score ponderado y las estadísticas de un solo restaurante."
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Score del restaurante
 */
router.get("/", getRanking_controller);
router.get("/:id", getRankingRestaurante_controller);

export default router;