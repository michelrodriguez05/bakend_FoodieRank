import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

export async function crearPlato(datos) {
  const db = getDB();
  const existe = await db.collection("platos").findOne({ nombre: datos.nombre });
  if (existe) throw new Error("Ya existe un plato con ese nombre");

  await db.collection("platos").insertOne({
    ...datos,
    creadoEn: new Date(),
  });

  return { mensaje: "Plato creado correctamente" };
}

export async function listarPlatosPorRestaurante(idRestaurante) {
  const db = getDB();
  const platos = await db.collection("platos").find({ restauranteId: idRestaurante }).toArray();
  return platos;
}

export async function eliminarPlato(id) {
  const db = getDB();
  await db.collection("platos").deleteOne({ _id: new ObjectId(id) });
  return { mensaje: "Plato eliminado correctamente" };
}
