import { getDB, getClient } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import { COLLECTION_RESEÑA } from "../models/reseña.model.js";

export async function crearReseña(datos, usuario) {
  const db = getDB();
  const client = getClient();
  const session = client.startSession();

  const reseña = {
    ...datos,
    restauranteId: new ObjectId(datos.restauranteId),
    usuarioId: usuario._id,
    fecha: new Date(),
    likes: 0,
    dislikes: 0,
  };

  try {
    await session.withTransaction(async () => {
      await db.collection(COLLECTION_RESEÑA).insertOne(reseña, { session });
      // Aquí podrías agregar lógica para actualizar el ranking del restaurante
    });
    return { mensaje: "Reseña creada correctamente" };
  } finally {
    session.endSession();
  }
}

export async function listarReseñasPorRestaurante(idRestaurante) {
  const db = getDB();
  const reseñas = await db.collection(COLLECTION_RESEÑA).find({ restauranteId: idRestaurante }).toArray();
  return reseñas;
}

export async function reaccionarReseña(id, tipo, usuarioId) {
  const db = getDB();
  const reseña = await db.collection(COLLECTION_RESEÑA).findOne({ _id: new ObjectId(id) });

  if (!reseña) throw new Error("Reseña no encontrada");
  if (reseña.usuarioId.toString() === usuarioId.toString()) {
    throw new Error("No puedes reaccionar a tu propia reseña");
  }

  const campo = tipo === "like" ? "likes" : "dislikes";
  await db.collection(COLLECTION_RESEÑA).updateOne({ _id: new ObjectId(id) }, { $inc: { [campo]: 1 } });
  return { mensaje: `Reseña ${tipo} agregada` };
}

export async function actualizarReseña(id, datos, usuarioId) {
  const db = getDB();
  const reseña = await db.collection(COLLECTION_RESEÑA).findOne({ _id: new ObjectId(id) });

  if (!reseña) throw new Error("Reseña no encontrada");
  if (reseña.usuarioId.toString() !== usuarioId.toString()) {
    throw new Error("No autorizado para editar esta reseña");
  }

  const resultado = await db.collection(COLLECTION_RESEÑA).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...datos, fechaActualizacion: new Date() } }
  );

  if (resultado.matchedCount === 0) throw new Error("Reseña no encontrada para actualizar");
  return { mensaje: "Reseña actualizada correctamente" };
}

export async function eliminarReseña(id, usuarioId) {
  const db = getDB();
  const reseña = await db.collection(COLLECTION_RESEÑA).findOne({ _id: new ObjectId(id) });

  if (!reseña) throw new Error("Reseña no encontrada");
  if (reseña.usuarioId.toString() !== usuarioId.toString()) {
    throw new Error("No autorizado para eliminar esta reseña");
  }

  const resultado = await db.collection(COLLECTION_RESEÑA).deleteOne({ _id: new ObjectId(id) });
  if (resultado.deletedCount === 0) throw new Error("Reseña no encontrada para eliminar");
  return { mensaje: "Reseña eliminada correctamente" };
}
