import { Router } from "express";
import { getUsuarios_controller, getUsuario_controller } from "../controllers/usuario.controller.js";
import { soloAdmin } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();

// Le dices a Passport que use la estrategia 'jwt' para proteger esta ruta.
// session: false es importante para decirle que no cree una sesión de cookie.
router.get("/", passport.authenticate('jwt', { session: false }), soloAdmin, getUsuarios_controller);
router.get("/:id", passport.authenticate('jwt', { session: false }), getUsuario_controller);

export default router;
