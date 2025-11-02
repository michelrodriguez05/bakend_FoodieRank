import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}
