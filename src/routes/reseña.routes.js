import { Router } from "express";
import {
  crearReseña_controller,
  listarReseñas_controller,
  reaccionarReseña_controller,
} from "../controllers/reseña.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validarReseña } from "../validaciones/reseña.validacion.js";

const router = Router();

router.post("/", verificarToken, validarReseña, crearReseña_controller);
router.get("/:restauranteId", listarReseñas_controller);
router.put("/reaccion/:id/:tipo", verificarToken, reaccionarReseña_controller);

export default router;
