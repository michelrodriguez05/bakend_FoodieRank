import bcrypt from "bcrypt";
import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

const COLECCION = "usuarios";

export async function registrarUsuario(data) {
    const db = getDB();
    const { nombre, email, contraseña, rol } = data;

    const existe = await db.collection(COLECCION).findOne({ email });
    if (existe) throw new Error("El correo ya está registrado");

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevo = { nombre, email, contraseña: hash, rol: rol || "usuario" };

    await db.collection(COLECCION).insertOne(nuevo);
    return { mensaje: "Usuario registrado correctamente" };
}

export async function iniciarSesion(email, contraseña) {
    const db = getDB();
    const usuario = await db.collection(COLECCION).findOne({ email });
    if (!usuario) throw new Error("Correo no registrado");

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) throw new Error("Contraseña incorrecta");

    return usuario;
}

export async function obtenerUsuarios() {
    const db = getDB();
    return await db.collection(COLECCION).find().toArray();
}

export async function obtenerUsuarioPorId(id) {
    const db = getDB();
    return await db.collection(COLECCION).findOne({ _id: new ObjectId(id) });
}
