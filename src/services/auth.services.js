import { getDB } from "../config/db.config.js";
import bcrypt from "bcrypt";
import { COLLECTION_USUARIO } from "../models/usuario.model.js";

/**
 * Registra un nuevo usuario.
 * @param {object} data - Datos del usuario (nombre, email, password).
 */
export async function registrarUsuario(data) {
  const db = getDB();
  const { email, password, nombre } = data;

  // Validación básica
  if (!email || !password || !nombre) {
    throw new Error("Faltan datos para el registro.");
  }

  // Verificar si el usuario ya existe
  const userExists = await db.collection(COLLECTION_USUARIO).findOne({ email });
  if (userExists) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  // Hashear la contraseña antes de guardarla
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const resultado = await db.collection(COLLECTION_USUARIO).insertOne({
    nombre,
    email,
    password: passwordHashed,
    rol: "usuario", // Rol por defecto
    creadoEn: new Date(),
  });

  // No devuelvas la contraseña en la respuesta
  return { id: resultado.insertedId, nombre, email, rol: "usuario" };
}

/**
 * Inicia sesión de un usuario.
 * @param {string} email - Email del usuario.
 * @param {string} password - Contraseña del usuario.
 */
export async function loginUsuario(email, password) {
  const db = getDB();
  // Validación básica
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos.");
  }

  const user = await db.collection(COLLECTION_USUARIO).findOne({ email });
  if (!user) throw new Error("Credenciales inválidas.");

  // Comparar la contraseña proporcionada con la hasheada en la BD
  const passwordValida = await bcrypt.compare(password, user.password);
  if (!passwordValida) throw new Error("Credenciales inválidas.");

  // No devolver la contraseña
  return { message: "Login exitoso", userId: user._id, nombre: user.nombre, rol: user.rol };
}