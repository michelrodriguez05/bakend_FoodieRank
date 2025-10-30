import { Router } from "express";
import {
  getCategorias_controller,
  getCategoria_controller,
  createCategoria_controller,
  updateCategoria_controller,
  deleteCategoria_controller,
} from "../controllers/categoria.controller.js";

import { protegerRuta, esAdmin } from "../middlewares/auth.middleware.js";
import { validarCategoria } from "../validaciones/categoria.validacion.js";

const router = Router();

router.get("/", getCategorias_controller);
router.get("/:id", getCategoria_controller);

// Las operaciones de creación/edición/eliminación solo admin
router.post("/", protegerRuta, esAdmin, validarCategoria, createCategoria_controller);
router.put("/:id", protegerRuta, esAdmin, validarCategoria, updateCategoria_controller);
router.delete("/:id", protegerRuta, esAdmin, deleteCategoria_controller);

export default router;
