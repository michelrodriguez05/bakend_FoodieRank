import { body, validationResult } from "express-validator";

export const validarRestaurante = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("categoria").notEmpty().withMessage("La categoría es obligatoria"),
  body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
  body("ubicacion").notEmpty().withMessage("La ubicación es obligatoria"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];
