/**
 * Define el nombre de la colección de restaurantes en la base de datos.
 */
export const COLLECTION_RESTAURANTE = "restaurantes";

/**
 * Representa el esquema de un documento de restaurante.
 */
export const restauranteSchema = {
  _id: "ObjectId",
  nombre: "String (único)",
  descripcion: "String",
  categoria: "String",
  ubicacion: "String",
  imagen: "String (opcional)",
  aprobado: "Boolean",
  creadoEn: "Date",
  actualizadoEn: "Date (opcional)",
};