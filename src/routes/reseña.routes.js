import { Router } from "express";
import {
  crearReseña_controller,
  listarReseñas_controller,
  reaccionarReseña_controller,
  actualizarReseña_controller,
  eliminarReseña_controller,
} from "../controllers/reseña.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validarReseña } from "../validation/reseña.validacion.js";

const router = Router();

router.post("/", verificarToken, validarReseña, crearReseña_controller);
router.get("/:restauranteId", listarReseñas_controller);
router.put("/reaccion/:id/:tipo", verificarToken, reaccionarReseña_controller);
router.put("/:id", verificarToken, validarReseña, actualizarReseña_controller);
router.delete("/:id", verificarToken, eliminarReseña_controller);

export default router;
