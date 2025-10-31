import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import { COLLECTION_CATEGORIA } from "../models/categoria.model.js";

export async function obtenerCategorias() {
  const db = getDB();
  return await db.collection(COLLECTION_CATEGORIA).find().toArray();
}

export async function obtenerCategoriaPorId(id) {
  const db = getDB();
  return await db.collection(COLLECTION_CATEGORIA).findOne({ _id: new ObjectId(id) });
}

export async function crearCategoria(data) {
  const { nombre, descripcion } = data;
  const db = getDB();

  const existe = await db.collection(COLLECTION_CATEGORIA).findOne({ nombre: nombre.trim() });
  if (existe) throw new Error("Ya existe una categoría con ese nombre");

  const nueva = { nombre: nombre.trim(), descripcion: descripcion || "", creadoEn: new Date() };
  await db.collection(COLLECTION_CATEGORIA).insertOne(nueva);
  return { mensaje: "Categoría creada correctamente" };
}

export async function actualizarCategoria(id, data) {
  const db = getDB();
  const resultado = await db.collection(COLLECTION_CATEGORIA).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, actualizadoEn: new Date() } }
  );
  if (resultado.matchedCount === 0) throw new Error("Categoría no encontrada para actualizar");
  return { mensaje: "Categoría actualizada correctamente" };
}

export async function eliminarCategoria(id) {
  const db = getDB();
  const resultado = await db.collection(COLLECTION_CATEGORIA).deleteOne({ _id: new ObjectId(id) });
  if (resultado.deletedCount === 0) throw new Error("Categoría no encontrada para eliminar");
  return { mensaje: "Categoría eliminada correctamente" };
}
