/**
 * Define el nombre de la colección de reseñas en la base de datos.
 */
export const COLLECTION_RESEÑA = "reseñas";

/**
 * Representa el esquema de un documento de reseña.
 */
export const reseñaSchema = {
  _id: "ObjectId",
  restauranteId: "ObjectId",
  usuarioId: "ObjectId",
  comentario: "String",
  calificacion: "Number (1-5)",
  likes: "Number",
  dislikes: "Number",
  fecha: "Date",
};