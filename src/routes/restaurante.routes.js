import { Router } from "express";
import {
  crearRestaurante_controller,
  listarRestaurantes_controller,
  obtenerRestaurante_controller,
  actualizarRestaurante_controller,
  eliminarRestaurante_controller,
  aprobarRestaurante_controller,
} from "../controllers/restaurante.controller.js";
import { protegerRuta, esAdmin } from "../middlewares/auth.middleware.js";
import { validarRestaurante } from "../validaciones/restaurante.validacion.js";

const router = Router();

router.get("/", listarRestaurantes_controller);
router.get("/:id", obtenerRestaurante_controller);
router.post("/", protegerRuta, validarRestaurante, crearRestaurante_controller);
router.put("/:id", protegerRuta, actualizarRestaurante_controller);
router.delete("/:id", protegerRuta, eliminarRestaurante_controller);

// Solo admin aprueba
router.put("/aprobar/:id", protegerRuta, esAdmin, aprobarRestaurante_controller);

export default router;
