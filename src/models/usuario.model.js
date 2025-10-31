
/**
 * Define el nombre de la colección de usuarios en la base de datos.
 */
export const COLLECTION_USUARIO = "usuarios";

/**
 * Representa el esquema de un documento de usuario.
 * Sirve como documentación y guía para el desarrollo.
 * NOTA: Al usar el driver nativo de MongoDB, este esquema no se aplica automáticamente.
 * La validación se realiza en las capas de servicio o con middlewares.
 */
export const userSchema = {
  _id: "ObjectId",
  nombre: "String",
  email: "String (único)",
  password: "String (hasheado)",
  rol: {
    description: "String, puede ser 'usuario' o 'admin'",
    default: "'usuario'",
  },
  creadoEn: "Date",
};
