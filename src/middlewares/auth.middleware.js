import { verificarToken } from "../utils/jwt.js";
import Usuario from "../models/usuario.model.js";

export const protegerRuta = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ mensaje: "Token no proporcionado" });

    const token = authHeader.split(" ")[1];
    const decodificado = verificarToken(token);
    req.usuario = await Usuario.findById(decodificado.id).select("-contraseña");
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
