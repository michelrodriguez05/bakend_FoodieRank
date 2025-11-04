import { Router } from "express";
import {
  crearPlato_controller,
  listarPlatosPorRestaurante_controller,
  eliminarPlato_controller,
  actualizarPlato_controller,
  listarTodosPlatos_controller,
} from "../controllers/plato.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js"; // Importamos soloAdmin
import { validarPlato } from "../validation/plato.validacion.js";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/platos:
 * post:
 * tags:
 * - Platos
 * summary: Crear un nuevo plato
 * description: "Añade un nuevo plato a un restaurante. (Ruta protegida, idealmente solo admin o dueño)."
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nombre:
 * type: string
 * example: "Hamburguesa Clásica"
 * precio:
 * type: number
 * example: 15000
 * restauranteId:
 * type: string
 * example: "60c72b969b1d8e001c8e4d8e"
 * responses:
 * '201':
 * description: Plato creado
 * /api/v1/platos/{restauranteId}:
 * get:
 * tags:
 * - Platos
 * summary: Listar platos de un restaurante
 * description: "Devuelve todos los platos asociados a un ID de restaurante."
 * parameters:
 * - in: path
 * name: restauranteId
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Lista de platos
 * /api/v1/platos/{id}:
 * put:
 * tags:
 * - Platos
 * summary: Actualizar un plato
 * description: "Actualiza el nombre o precio de un plato (Ruta protegida)."
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
 * description: Plato actualizado
 * delete:
 * tags:
 * - Platos
 * summary: Eliminar un plato
 * description: "Elimina un plato (Ruta protegida)."
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
 * description: Plato eliminado
 */

// Aplicamos protección de Admin a las rutas de creación, actualización y eliminación
router.post("/", verificarToken, soloAdmin, validarPlato, crearPlato_controller);
router.get("/admin/todos", verificarToken, soloAdmin, listarTodosPlatos_controller);
router.get("/:restauranteId", listarPlatosPorRestaurante_controller);
router.put("/:id", verificarToken, soloAdmin, validarPlato, actualizarPlato_controller);
router.delete("/:id", verificarToken, soloAdmin, eliminarPlato_controller);

export default router;
