import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import { COLLECTION_RESTAURANTE } from "../models/restaurante.model.js";

export async function crearRestaurante(datos) {
  const db = getDB();
  const existe = await db.collection(COLLECTION_RESTAURANTE).findOne({ nombre: datos.nombre });
  if (existe) throw new Error("Ya existe un restaurante con ese nombre");

  await db.collection(COLLECTION_RESTAURANTE).insertOne({
    ...datos,
    aprobado: false,
    creadoEn: new Date(),
  });

  return { mensaje: "Restaurante creado, pendiente de aprobación" };
}

export async function listarRestaurantes(filtros = {}) {
  const db = getDB();
  const query = { aprobado: true }; // Por defecto, solo mostrar restaurantes aprobados

  if (filtros.categoria) {
    query.categoria = filtros.categoria;
  }
  const restaurantes = await db.collection(COLLECTION_RESTAURANTE).find(query).toArray();
  return restaurantes;
}

export async function obtenerRestaurantePorId(id) {
  const db = getDB();
  const restaurante = await db.collection(COLLECTION_RESTAURANTE).findOne({ _id: new ObjectId(id) });
  if (!restaurante) throw new Error("Restaurante no encontrado");
  return restaurante;
}

export async function actualizarRestaurante(id, datos) {
  const db = getDB();
  await db.collection(COLLECTION_RESTAURANTE).updateOne({ _id: new ObjectId(id) }, { $set: datos });
  return { mensaje: "Restaurante actualizado correctamente" };
}

export async function eliminarRestaurante(id) {
  const db = getDB();
  await db.collection(COLLECTION_RESTAURANTE).deleteOne({ _id: new ObjectId(id) });
  return { mensaje: "Restaurante eliminado correctamente" };
}

export async function aprobarRestaurante(id) {
  const db = getDB();
  await db.collection(COLLECTION_RESTAURANTE).updateOne({ _id: new ObjectId(id) }, { $set: { aprobado: true } });
  return { mensaje: "Restaurante aprobado correctamente" };
}
