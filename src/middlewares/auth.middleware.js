import dotenv from "dotenv";
import passport from "passport"; 
dotenv.config();

export const verificarToken = passport.authenticate('jwt', { session: false });

export function soloAdmin(req, res, next) {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" });
  }
  next();
}