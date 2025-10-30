import { getDB } from "../config/db.config.js";

export async function crearRestaurante(datos) {
  const db = getDB();
  const existe = await db.collection("restaurantes").findOne({ nombre: datos.nombre });
  if (existe) throw new Error("Ya existe un restaurante con ese nombre");

  await db.collection("restaurantes").insertOne({
    ...datos,
    aprobado: false,
    creadoEn: new Date(),
  });

  return { mensaje: "Restaurante creado, pendiente de aprobación" };
}

export async function listarRestaurantes() {
  const db = getDB();
  const restaurantes = await db.collection("restaurantes").find().toArray();
  return restaurantes;
}

export async function obtenerRestaurantePorId(id) {
  const db = getDB();
  const restaurante = await db.collection("restaurantes").findOne({ _id: new ObjectId(id) });
  if (!restaurante) throw new Error("Restaurante no encontrado");
  return restaurante;
}

export async function actualizarRestaurante(id, datos) {
  const db = getDB();
  await db.collection("restaurantes").updateOne({ _id: new ObjectId(id) }, { $set: datos });
  return { mensaje: "Restaurante actualizado correctamente" };
}

export async function eliminarRestaurante(id) {
  const db = getDB();
  await db.collection("restaurantes").deleteOne({ _id: new ObjectId(id) });
  return { mensaje: "Restaurante eliminado correctamente" };
}

export async function aprobarRestaurante(id) {
  const db = getDB();
  await db.collection("restaurantes").updateOne({ _id: new ObjectId(id) }, { $set: { aprobado: true } });
  return { mensaje: "Restaurante aprobado correctamente" };
}
