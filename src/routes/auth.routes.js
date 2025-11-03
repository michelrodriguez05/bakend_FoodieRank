import { Router } from "express";
import { body } from "express-validator";
import { registrar_controller, login_controller } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    // Middleware temporal para depuración: Muestra el body de la petición en la consola del backend.
    (req, res, next) => {
      console.log("Petición a /register recibida con el siguiente body:");
      console.log(req.body);
      next();
    },
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
