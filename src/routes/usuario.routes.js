import { Router } from "express";
import { registrar, login } from "../controllers/usuario.controller.js";

const router = Router();

/**
 * @swagger
 * /api/usuarios/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 */

router.post("/registro", registrar);
router.post("/login", login);

export default router;
