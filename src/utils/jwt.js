import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generarToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "8h" });
};

export const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
