import { Router } from "express";
import {
  getCategorias_controller,
  getCategoria_controller,
  createCategoria_controller,
  updateCategoria_controller,
  deleteCategoria_controller,
} from "../controllers/categoria.controller.js";

import { validarCategoria } from "../validation/categoria.validacion.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getCategorias_controller);
router.get("/:id", getCategoria_controller);

// Las operaciones de creación/edición/eliminación requieren token y solo admin
router.post("/", verificarToken, soloAdmin, validarCategoria, createCategoria_controller);
router.put("/:id", verificarToken, soloAdmin, validarCategoria, updateCategoria_controller);
router.delete("/:id", verificarToken, soloAdmin, deleteCategoria_controller);

export default router;
