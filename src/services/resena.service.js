import { getDB, getClient } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import { COLLECTION_RESEÑA } from "../models/resena.model.js";

export async function crearReseña(datos, usuario) {
  const db = getDB();
  const client = getClient();
  const session = client.startSession();

  const reseña = {
    ...datos,
    restauranteId: new ObjectId(datos.restauranteId),
    usuarioId: usuario._id,
    fecha: new Date(),
    // --- CAMBIO ---
    likedBy: [], // Inicializar como arrays vacíos
    dislikedBy: [], // Inicializar como arrays vacíos
    // --- FIN DE CAMBIO ---
  };

  try {
    await session.withTransaction(async () => {
      await db.collection(COLLECTION_RESEÑA).insertOne(reseña, { session });
      // Aquí podrías agregar lógica para actualizar el ranking del restaurante
      // (Aunque tu ranking.service ya lo calcula 'on-the-fly' lo cual es válido)
    });
    return { mensaje: "Reseña creada correctamente" };
  } finally {
    session.endSession();
  }
}

export async function listarReseñasPorRestaurante(idRestaurante) {
  const db = getDB();
  // Convertimos el ID a ObjectId
  const reseñas = await db.collection(COLLECTION_RESEÑA).find({ restauranteId: new ObjectId(idRestaurante) }).toArray();
  return reseñas;
}


// --- LÓGICA DE REACCIÓN COMPLETAMENTE NUEVA ---
export async function reaccionarReseña(id, tipo, usuarioId) {
  const db = getDB();
  const reseñaId = new ObjectId(id);
  const userId = new ObjectId(usuarioId); // Asegurarse que el ID de usuario sea ObjectId

  const reseña = await db.collection(COLLECTION_RESEÑA).findOne({ _id: reseñaId });

  if (!reseña) throw new Error("Reseña no encontrada");
  if (reseña.usuarioId.toString() === userId.toString()) {
    throw new Error("No puedes reaccionar a tu propia reseña");
  }

  let updateOperation = {};
  let mensaje = "";

  const yaDioLike = reseña.likedBy.some(id => id.equals(userId));
  const yaDioDislike = reseña.dislikedBy.some(id => id.equals(userId));

  if (tipo === "like") {
    if (yaDioLike) {
      // Ya tiene like, se lo quitamos
      updateOperation = { $pull: { likedBy: userId } };
      mensaje = "Like quitado";
    } else {
      // No tiene like, se lo ponemos. Si tenía dislike, se lo quitamos.
      updateOperation = { 
        $addToSet: { likedBy: userId },
        $pull: { dislikedBy: userId } 
      };
      mensaje = "Like agregado";
    }
  } else if (tipo === "dislike") {
    if (yaDioDislike) {
      // Ya tiene dislike, se lo quitamos
      updateOperation = { $pull: { dislikedBy: userId } };
      mensaje = "Dislike quitado";
    } else {
      // No tiene dislike, se lo ponemos. Si tenía like, se lo quitamos.
      updateOperation = { 
        $addToSet: { dislikedBy: userId },
        $pull: { likedBy: userId } 
      };
      mensaje = "Dislike agregado";
    }
  } else {
    throw new Error("Tipo de reacción no válida");
  }

  await db.collection(COLLECTION_RESEÑA).updateOne({ _id: reseñaId }, updateOperation);
  return { mensaje };
}
// --- FIN DE LÓGICA DE REACCIÓN ---


export async function actualizarReseña(id, datos, usuarioId) {
  const db = getDB();
  const reseñaId = new ObjectId(id);
  const userId = new ObjectId(usuarioId);

  const reseña = await db.collection(COLLECTION_RESEÑA).findOne({ _id: reseñaId });

  if (!reseña) throw new Error("Reseña no encontrada");
  if (reseña.usuarioId.toString() !== userId.toString()) {
    throw new Error("No autorizado para editar esta reseña");
  }

  // Asegurarnos de no sobreescribir campos protegidos
  const { comentario, calificacion } = datos;

  const resultado = await db.collection(COLLECTION_RESEÑA).updateOne(
    { _id: reseñaId },
    { $set: { comentario, calificacion, fechaActualizacion: new Date() } }
  );

  if (resultado.matchedCount === 0) throw new Error("Reseña no encontrada para actualizar");
  return { mensaje: "Reseña actualizada correctamente" };
}

export async function eliminarReseña(id, usuarioId) {
  const db = getDB();
  const reseñaId = new ObjectId(id);
  const userId = new ObjectId(usuarioId);

  const reseña = await db.collection(COLLECTION_RESEÑA).findOne({ _id: reseñaId });

  if (!reseña) throw new Error("Reseña no encontrada");
  if (reseña.usuarioId.toString() !== userId.toString()) {
    throw new Error("No autorizado para eliminar esta reseña");
  }

  const resultado = await db.collection(COLLECTION_RESEÑA).deleteOne({ _id: reseñaId });
  if (resultado.deletedCount === 0) throw new Error("Reseña no encontrada para eliminar");
  return { mensaje: "Reseña eliminada correctamente" };
}