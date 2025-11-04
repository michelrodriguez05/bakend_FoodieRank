import { Router } from "express";
import { getUsuarios_controller, getUsuario_controller } from "../controllers/usuario.controller.js";
import { soloAdmin } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/usuarios:
 * get:
 * tags:
 * - Admin
 * summary: (Admin) Listar todos los usuarios
 * description: "Devuelve una lista de todos los usuarios registrados (solo para admin)."
 * security:
 * - bearerAuth: []
 * responses:
 * '200':
 * description: Lista de usuarios
 * '403':
 * description: Acceso denegado
 * /api/v1/usuarios/{id}:
 * get:
 * tags:
 * - Usuarios
 * summary: Obtener perfil de usuario
 * description: "Obtiene los datos públicos de un usuario (protegido)."
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
 * description: Datos del usuario
 * '404':
 * description: Usuario no encontrado
 */
router.get("/", passport.authenticate('jwt', { session: false }), soloAdmin, getUsuarios_controller);
router.get("/:id", passport.authenticate('jwt', { session: false }), getUsuario_controller);

export default router;