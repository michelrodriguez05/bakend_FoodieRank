import { body, validationResult } from "express-validator";

export const validarPlato = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("precio").isNumeric().withMessage("El precio debe ser un número"),
  body("restauranteId").notEmpty().withMessage("Debe indicar el restaurante al que pertenece"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];
