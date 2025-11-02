import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
let client;
let db;

export async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("La variable de entorno MONGODB_URI no está definida. Asegúrate de tener un archivo .env");
        }
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("✅ Conexión a MongoDB establecida correctamente");
    } catch (error) {
        console.error("❌ Error al conectar con MongoDB:", error);
        process.exit(1);
    }
}

export function getDB() {
    if (!db) throw new Error("La base de datos no está conectada");
    return db;
}

export function getClient() {
    if (!client) throw new Error("El cliente no está inicializado");
    return client;
}

export async function closeDB() {
  try {
    await client.close();
    console.log("🔒 Conexión con MongoDB cerrada correctamente.");
  } catch (error) {
    console.error("❌ Error al cerrar la conexión:", error);
  }
}