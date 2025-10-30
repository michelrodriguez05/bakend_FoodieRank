import { Router } from "express";
import {
  crearPlato_controller,
  listarPlatosPorRestaurante_controller,
  eliminarPlato_controller,
} from "../controllers/plato.controller.js";
import { protegerRuta } from "../middlewares/auth.middleware.js";
import { validarPlato } from "../validaciones/plato.validacion.js";

const router = Router();

router.post("/", protegerRuta, validarPlato, crearPlato_controller);
router.get("/:restauranteId", listarPlatosPorRestaurante_controller);
router.delete("/:id", protegerRuta, eliminarPlato_controller);

export default router;
