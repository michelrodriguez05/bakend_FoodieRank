import { Router } from "express";
import {
  getCategorias_controller,
  getCategoria_controller,
  createCategoria_controller,
  updateCategoria_controller,
  deleteCategoria_controller,
} from "../controllers/categoria.controller.js";

import { validarCategoria } from "../validation/categoria.validacion.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/categorias:
 * get:
 * tags:
 * - Categorías
 * summary: Listar todas las categorías
 * description: "Devuelve un array con todas las categorías de restaurantes."
 * responses:
 * '200':
 * description: Lista de categorías
 * post:
 * tags:
 * - Admin
 * summary: (Admin) Crear una nueva categoría
 * description: "Crea una nueva categoría para los restaurantes."
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
 * example: "Mexicana"
 * descripcion:
 * type: string
 * example: "Tacos, burritos, etc."
 * responses:
 * '201':
 * description: Categoría creada
 * '403':
 * description: Acceso denegado
 * /api/v1/categorias/{id}:
 * get:
 * tags:
 * - Categorías
 * summary: Obtener una categoría por ID
 * description: "Devuelve los detalles de una categoría específica."
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Detalle de la categoría
 * '404':
 * description: Categoría no encontrada
 * put:
 * tags:
 * - Admin
 * summary: (Admin) Actualizar una categoría
 * description: "Actualiza el nombre o descripción de una categoría."
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
 * description: Categoría actualizada
 * delete:
 * tags:
 * - Admin
 * summary: (Admin) Eliminar una categoría
 * description: "Elimina una categoría."
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
 * description: Categoría eliminada
 */

router.get("/", getCategorias_controller);
router.get("/:id", getCategoria_controller);
router.post("/", verificarToken, soloAdmin, validarCategoria, createCategoria_controller);
router.put("/:id", verificarToken, soloAdmin, validarCategoria, updateCategoria_controller);
router.delete("/:id", verificarToken, soloAdmin, deleteCategoria_controller);

export default router;
