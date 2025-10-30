
export const COLLECTION_USUARIO = "usuarios";

export const userSchema = {
  nombre: String,
  email: String,
  password: String,
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  fechaRegistro: {
    type: Date,
    default: new Date(),
  },
};
