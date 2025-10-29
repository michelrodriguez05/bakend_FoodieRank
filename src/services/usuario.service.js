import Usuario from "../models/usuario.model.js";
import { generarToken } from "../utils/jwt.js";

export const registrarUsuario = async (data) => {
  const existe = await Usuario.findOne({ correo: data.correo });
  if (existe) throw new Error("El correo ya está registrado");

  const usuario = new Usuario(data);
  await usuario.save();

  const token = generarToken(usuario._id, usuario.rol);
  return { usuario, token };
};

export const loginUsuario = async (correo, contraseña) => {
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) throw new Error("Usuario no encontrado");

  const valido = await usuario.compararContraseña(contraseña);
  if (!valido) throw new Error("Contraseña incorrecta");

  const token = generarToken(usuario._id, usuario.rol);
  return { usuario, token };
};
