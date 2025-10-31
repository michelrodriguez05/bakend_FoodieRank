/**
 * Define el nombre de la colección de categorías en la base de datos.
 */
export const COLLECTION_CATEGORIA = "categorias";

/**
 * Representa el esquema de un documento de categoría.
 */
export const categoriaSchema = {
  _id: "ObjectId",
  nombre: "String (único)",
  descripcion: "String (opcional)",
  creadoEn: "Date",
};