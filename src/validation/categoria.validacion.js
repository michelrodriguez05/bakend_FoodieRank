import { body } from "express-validator";
import { validarCampos } from "../middlewares/validate.middleware.js";

export const validarCategoria = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la categoría es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto."),
  validarCampos,
];