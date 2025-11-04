import { Router } from "express";
import {
  crearRestaurante_controller,
  listarRestaurantes_controller,
  obtenerRestaurante_controller,
  actualizarRestaurante_controller,
  eliminarRestaurante_controller,
  aprobarRestaurante_controller,
  listarTodosRestaurantes_controller,
} from "../controllers/restaurante.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { validarRestaurante } from "../validation/restaurante.validacion.js";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/restaurantes:
 * get:
 * tags:
 * - Restaurantes
 * summary: Listar todos los restaurantes aprobados
 * description: "Devuelve una lista de restaurantes que han sido aprobados por un administrador."
 * parameters:
 * - in: query
 * name: categoria
 * schema:
 * type: string
 * description: "(Opcional) Filtra los restaurantes por categoría (ej. 'Comida rápida')"
 * responses:
 * '200':
 * description: Lista de restaurantes
 * post:
 * tags:
 * - Restaurantes
 * summary: Crear un nuevo restaurante (pendiente de aprobación)
 * description: "Permite a un usuario autenticado registrar un restaurante. Queda 'aprobado: false' por defecto."
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
 * example: "La Pizzería de Juan"
 * descripcion:
 * type: string
 * example: "Las mejores pizzas artesanales."
 * categoria:
 * type: string
 * example: "Italiana"
 * ubicacion:
 * type: string
 * example: "Calle Falsa 123"
 * imagen:
 * type: string
 * example: "https://url-de-imagen.com/pizza.jpg"
 * responses:
 * '201':
 * description: Restaurante creado, pendiente de aprobación
 * '400':
 * description: Error de validación
 * '401':
 * description: No autorizado (token inválido o no provisto)
 * /api/v1/restaurantes/admin/todos:
 * get:
 * tags:
 * - Admin
 * summary: (Admin) Listar TODOS los restaurantes
 * description: "Devuelve una lista de todos los restaurantes en la base de datos, sin filtrar por aprobación."
 * security:
 * - bearerAuth: []
 * responses:
 * '200':
 * description: Lista de todos los restaurantes
 * '401':
 * description: No autorizado
 * '403':
 * description: Acceso denegado (no es admin)
 * /api/v1/restaurantes/aprobar/{id}:
 * put:
 * tags:
 * - Admin
 * summary: (Admin) Aprobar un restaurante
 * description: "Permite a un administrador cambiar el estado de un restaurante a 'aprobado: true'."
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: "El ID del restaurante a aprobar"
 * responses:
 * '200':
 * description: Restaurante aprobado correctamente
 * '401':
 * description: No autorizado (sin token)
 * '403':
 * description: Acceso denegado (no es admin)
 * /api/v1/restaurantes/{id}:
 * get:
 * tags:
 * - Restaurantes
 * summary: Obtener detalle de un restaurante
 * description: "Devuelve la información detallada de un solo restaurante."
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * example: "60c72b969b1d8e001c8e4d8e"
 * description: "El ID del restaurante"
 * responses:
 * '200':
 * description: Detalle del restaurante
 * '404':
 * description: Restaurante no encontrado
 * put:
 * tags:
 * - Admin
 * summary: (Admin) Actualizar un restaurante
 * description: "Actualiza los datos de un restaurante existente."
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
 * description: Restaurante actualizado
 * delete:
 * tags:
 * - Admin
 * summary: (Admin) Eliminar un restaurante
 * description: "Elimina un restaurante de la base de datos."
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
 * description: Restaurante eliminado
 */

router.get("/", listarRestaurantes_controller);
router.get("/admin/todos", verificarToken, soloAdmin, listarTodosRestaurantes_controller);
router.get("/:id", obtenerRestaurante_controller);
router.post("/", verificarToken, validarRestaurante, crearRestaurante_controller);
router.put("/aprobar/:id", verificarToken, soloAdmin, aprobarRestaurante_controller);
router.put("/:id", verificarToken, soloAdmin, actualizarRestaurante_controller);
router.delete("/:id", verificarToken, soloAdmin, eliminarRestaurante_controller);

export default router;