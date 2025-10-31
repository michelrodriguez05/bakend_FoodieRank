/**
 * Define el nombre de la colección de platos en la base de datos.
 */
export const COLLECTION_PLATO = "platos";

/**
 * Representa el esquema de un documento de plato.
 */
export const platoSchema = {
  _id: "ObjectId",
  nombre: "String",
  descripcion: "String (opcional)",
  precio: "Number",
  restauranteId: "ObjectId",
  creadoEn: "Date",
  actualizadoEn: "Date (opcional)",
};