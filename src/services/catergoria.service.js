import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

const COLECCION = "categorias";

export async function obtenerCategorias() {
  const db = getDB();
  return await db.collection(COLECCION).find().toArray();
}

export async function obtenerCategoriaPorId(id) {
  const db = getDB();
  return await db.collection(COLECCION).findOne({ _id: new ObjectId(id) });
}

export async function crearCategoria(data) {
  const { nombre, descripcion } = data;
  const db = getDB();

  const existe = await db.collection(COLECCION).findOne({ nombre: nombre.trim() });
  if (existe) throw new Error("Ya existe una categoría con ese nombre");

  const nueva = { nombre: nombre.trim(), descripcion: descripcion || "", creadoEn: new Date() };
  await db.collection(COLECCION).insertOne(nueva);
  return { mensaje: "Categoría creada correctamente" };
}

export async function actualizarCategoria(id, data) {
  const db = getDB();
  const resultado = await db.collection(COLECCION).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, actualizadoEn: new Date() } }
  );
  if (resultado.matchedCount === 0) throw new Error("Categoría no encontrada para actualizar");
  return { mensaje: "Categoría actualizada correctamente" };
}

export async function eliminarCategoria(id) {
  const db = getDB();
  const resultado = await db.collection(COLECCION).deleteOne({ _id: new ObjectId(id) });
  if (resultado.deletedCount === 0) throw new Error("Categoría no encontrada para eliminar");
  return { mensaje: "Categoría eliminada correctamente" };
}
