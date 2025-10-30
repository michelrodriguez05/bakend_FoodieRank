import { body, validationResult } from "express-validator";

export const validarReseña = [
  body("comentario").notEmpty().withMessage("El comentario es obligatorio"),
  body("calificacion").isInt({ min: 1, max: 5 }).withMessage("La calificación debe estar entre 1 y 5"),
  body("restauranteId").notEmpty().withMessage("Debe indicar el restaurante al que pertenece"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];
