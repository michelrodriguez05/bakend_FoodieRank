import { Router } from "express";
import { getUsuarios_controller, getUsuario_controller } from "../controllers/usuario.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, soloAdmin, getUsuarios_controller);
router.get("/:id", verificarToken, getUsuario_controller);

export default router;
