import { Router } from "express";
import {
  crearPlato_controller,
  listarPlatosPorRestaurante_controller,
  eliminarPlato_controller,
  actualizarPlato_controller,
} from "../controllers/plato.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validarPlato } from "../validation/plato.validacion.js";

const router = Router();

router.post("/", verificarToken, validarPlato, crearPlato_controller);
router.get("/:restauranteId", listarPlatosPorRestaurante_controller);
router.put("/:id", verificarToken, validarPlato, actualizarPlato_controller);
router.delete("/:id", verificarToken, eliminarPlato_controller);

export default router;
