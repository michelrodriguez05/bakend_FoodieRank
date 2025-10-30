import { Router } from "express";
import {
  crearReseña_controller,
  listarReseñas_controller,
  reaccionarReseña_controller,
} from "../controllers/reseña.controller.js";
import { protegerRuta } from "../middlewares/auth.middleware.js";
import { validarReseña } from "../validaciones/reseña.validacion.js";

const router = Router();

router.post("/", protegerRuta, validarReseña, crearReseña_controller);
router.get("/:restauranteId", listarReseñas_controller);
router.put("/reaccion/:id/:tipo", protegerRuta, reaccionarReseña_controller);

export default router;
