import { Router } from "express";
import { body } from "express-validator";
import { registrar_controller, login_controller } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validate.middleware.js";

const router = Router();

/**
 * @openapi
 * paths:
 * /api/v1/auth/register:
 * post:
 * tags:
 * - Autenticación
 * summary: Registrar un nuevo usuario
 * description: "Registra un nuevo usuario con rol 'usuario' por defecto."
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nombre:
 * type: string
 * example: "Juan Pérez"
 * email:
 * type: string
 * example: "juan.perez@example.com"
 * password:
 * type: string
 * example: "password123"
 * responses:
 * '201':
 * description: Usuario registrado correctamente
 * '400':
 * description: Error de validación
 * '409':
 * description: El correo ya está registrado
 * /api/v1/auth/login:
 * post:
 * tags:
 * - Autenticación
 * summary: Iniciar sesión
 * description: "Autentica a un usuario y devuelve un token JWT."
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * example: "admin@foodie.com"
 * password:
 * type: string
 * example: "admin123"
 * responses:
 * '200':
 * description: Inicio de sesión exitoso
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * token:
 * type: string
 * usuario:
 * type: object
 * properties:
 * id:
 * type: string
 * nombre:
 * type: string
 * rol:
 * type: string
 * '401':
 * description: Credenciales inválidas
 */
router.post(
  "/register",
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
    validarCampos,
  ],
  registrar_controller
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    validarCampos,
  ],
  login_controller
);

export default router;