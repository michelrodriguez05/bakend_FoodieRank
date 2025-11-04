export const COLLECTION_RESEÑA = "resenas";
export const reseñaSchema = {
  _id: "ObjectId",
  restauranteId: "ObjectId",
  usuarioId: "ObjectId",
  comentario: "String",
  calificacion: "Number (1-5)",
  likedBy: "[ObjectId]",
  dislikedBy: "[ObjectId]",
  fecha: "Date",
};