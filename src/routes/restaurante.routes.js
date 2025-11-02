import { Router } from "express";
import {
  crearRestaurante_controller,
  listarRestaurantes_controller,
  obtenerRestaurante_controller,
  actualizarRestaurante_controller,
  eliminarRestaurante_controller,
  aprobarRestaurante_controller,
} from "../controllers/restaurante.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { validarRestaurante } from "../validation/restaurante.validacion.js";

const router = Router();

router.get("/", listarRestaurantes_controller);
router.get("/:id", obtenerRestaurante_controller);
router.post("/", verificarToken, validarRestaurante, crearRestaurante_controller);
router.put("/:id", verificarToken, actualizarRestaurante_controller);
router.delete("/:id", verificarToken, eliminarRestaurante_controller);

// Solo admin aprueba
router.put("/aprobar/:id", verificarToken, soloAdmin, aprobarRestaurante_controller);

export default router;
