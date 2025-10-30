import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

export async function crearReseña(datos, usuario) {
  const db = getDB();

  const reseña = {
    ...datos,
    usuarioId: usuario._id,
    fecha: new Date(),
    likes: 0,
    dislikes: 0,
  };

  await db.collection("reseñas").insertOne(reseña);
  return { mensaje: "Reseña creada correctamente" };
}

export async function listarReseñasPorRestaurante(idRestaurante) {
  const db = getDB();
  const reseñas = await db.collection("reseñas").find({ restauranteId: idRestaurante }).toArray();
  return reseñas;
}

export async function reaccionarReseña(id, tipo) {
  const db = getDB();
  const campo = tipo === "like" ? "likes" : "dislikes";
  await db.collection("reseñas").updateOne({ _id: new ObjectId(id) }, { $inc: { [campo]: 1 } });
  return { mensaje: `Reseña ${tipo} agregada` };
}
