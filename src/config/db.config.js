import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export const connectToDatabase = async () => {
  if (db) return db;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("✅ Conectado a MongoDB correctamente");
    return db;
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) throw new Error("❗ No hay conexión activa a la base de datos.");
  return db;
};
