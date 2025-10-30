import { Router } from "express";
import { registro_controller, login_controller, getUsuarios_controller, getUsuario_controller } from "../controllers/usuario.controller.js";
import { protegerRuta, esAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/registro", registro_controller);
router.post("/login", login_controller);
router.get("/", protegerRuta, esAdmin, getUsuarios_controller);
router.get("/:id", protegerRuta, getUsuario_controller);

export default router;
