import dotenv from "dotenv";
dotenv.config();

export function soloAdmin(req, res, next) { // This is the actual exported name
  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" });
  }
  next();
}
