import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import { COLLECTION_PLATO } from "../models/plato.model.js";

export async function crearPlato(datos) {
  const db = getDB();
  const existe = await db.collection(COLLECTION_PLATO).findOne({ nombre: datos.nombre, restauranteId: datos.restauranteId });
  if (existe) throw new Error("Ya existe un plato con ese nombre");

  await db.collection(COLLECTION_PLATO).insertOne({
    ...datos,
    creadoEn: new Date(),
  });

  return { mensaje: "Plato creado correctamente" };
}

export async function listarPlatosPorRestaurante(idRestaurante) {
  const db = getDB();
  const platos = await db.collection(COLLECTION_PLATO).find({ restauranteId: idRestaurante }).toArray();
  return platos;
}

export async function actualizarPlato(id, datos) {
  const db = getDB();
  const resultado = await db.collection(COLLECTION_PLATO).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...datos, actualizadoEn: new Date() } }
  );
  if (resultado.matchedCount === 0) throw new Error("Plato no encontrado para actualizar");
  return { mensaje: "Plato actualizado correctamente" };
}

export async function eliminarPlato(id) {
  const db = getDB();
  await db.collection(COLLECTION_PLATO).deleteOne({ _id: new ObjectId(id) });
  return { mensaje: "Plato eliminado correctamente" };
}

// ... al final del archivo ...
export async function listarTodosPlatos() {
  const db = getDB();
  // Usamos $lookup para añadir el nombre del restaurante a cada plato
  const pipeline = [
    {
      $lookup: {
        from: "restaurantes", // La colección de restaurantes
        localField: "restauranteId", // El campo en 'platos'
        foreignField: "_id",       // El campo en 'restaurantes'
        as: "restauranteInfo"      // Nombre del nuevo array
      }
    },
    {
      $unwind: "$restauranteInfo" // Descomprime el array
    },
    {
      $project: {
        _id: 1,
        nombre: 1,
        precio: 1,
        restauranteId: 1,
        restauranteNombre: "$restauranteInfo.nombre" // Obtenemos el nombre
      }
    }
  ];
  const platos = await db.collection(COLLECTION_PLATO).aggregate(pipeline).toArray();
  return platos;
}