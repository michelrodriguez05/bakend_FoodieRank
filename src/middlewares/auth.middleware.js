import passport from "passport";
import { estrategiaJwt } from "../config/passport.config.js";

passport.use(estrategiaJwt);

export const protegerRuta = passport.authenticate("jwt", { session: false });

export const esAdmin = (req, res, next) => {
    if (req.user && req.user.rol === "admin") {
        return next();
    }
    return res.status(403).json({ mensaje: "Acceso denegado, se requieren permisos de administrador" });
};
