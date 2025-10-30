
import { getDB } from "../config/db.config.js";
import { COLLECTION_USERS } from "../models/user.model.js";
import { COLLECTION_USUARIO } from "../models/usuario.model.js";
import { encriptarPassword, compararPassword } from "../utils/hash.utils.js";
import { generarToken } from "../utils/jwt.utils.js";

export async function registrarUsuario(data) {
  const db = await getDB();
  const { nombre, email, password, rol } = data;

  const existente = await db.collection(COLLECTION_USUARIO).findOne({ email });
  if (existente) throw new Error("El correo ya está registrado");

  const hash = await encriptarPassword(password);
  const nuevoUsuario = {
    nombre,
    email,
    password: hash,
    rol: rol || "usuario",
    fechaRegistro: new Date(),
  };

  await db.collection(COLLECTION_USUARIO).insertOne(nuevoUsuario);
  return { message: "Usuario registrado correctamente" };
}

export async function loginUsuario(email, password) {
  const db = await getDB();
  const usuario = await db.collection(COLLECTION_USUARIO).findOne({ email });

  if (!usuario) throw new Error("Usuario no encontrado");

  const match = await compararPassword(password, usuario.password);
  if (!match) throw new Error("Contraseña incorrecta");

  const token = generarToken(usuario);
  return {
    message: "Inicio de sesión exitoso",
    token,
    usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
  };
}
