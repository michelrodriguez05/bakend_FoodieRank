import { Router } from "express";
import {
  crearReseña_controller,
  listarReseñas_controller,
  reaccionarReseña_controller,
  actualizarReseña_controller,
  eliminarReseña_controller,
} from "../controllers/resena.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validarReseña } from "../validation/resena.validacion.js";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/reseñas:
 * post:
 * tags:
 * - Reseñas
 * summary: Crear una nueva reseña
 * description: "Publica una nueva reseña para un restaurante."
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * comentario:
 * type: string
 * example: "¡La comida estuvo increíble!"
 * calificacion:
 * type: number
 * example: 5
 * restauranteId:
 * type: string
 * example: "60c72b969b1d8e001c8e4d8e"
 * responses:
 * '201':
 * description: Reseña creada
 * /api/v1/reseñas/{restauranteId}:
 * get:
 * tags:
 * - Reseñas
 * summary: Listar reseñas de un restaurante
 * description: "Obtiene todas las reseñas de un restaurante específico."
 * parameters:
 * - in: path
 * name: restauranteId
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Lista de reseñas
 * /api/v1/reseñas/reaccion/{id}/{tipo}:
 * put:
 * tags:
 * - Reseñas
 * summary: Dar 'like' o 'dislike' a una reseña
 * description: "Permite a un usuario reaccionar a la reseña de otro usuario."
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: "ID de la reseña"
 * - in: path
 * name: tipo
 * required: true
 * schema:
 * type: string
 * enum: [like, dislike]
 * description: "Tipo de reacción"
 * responses:
 * '200':
 * description: Reacción registrada
 * /api/v1/reseñas/{id}:
 * put:
 * tags:
 * - Reseñas
 * summary: Actualizar una reseña propia
 * description: "Permite al autor de una reseña modificarla."
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * responses:
 * '200':
 * description: Reseña actualizada
 * '403':
 * description: No autorizado
 * delete:
 * tags:
 * - Reseñas
 * summary: Eliminar una reseña propia
 * description: "Permite al autor de una reseña eliminarla."
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Reseña eliminada
 * '403':
 * description: No autorizado
 */

router.post("/", verificarToken, validarReseña, crearReseña_controller);
router.get("/:restauranteId", listarReseñas_controller);
router.put("/reaccion/:id/:tipo", verificarToken, reaccionarReseña_controller);
router.put("/:id", verificarToken, validarReseña, actualizarReseña_controller);
router.delete("/:id", verificarToken, eliminarReseña_controller);
router.put("/:notificaciones/:id/vista")
export default router;