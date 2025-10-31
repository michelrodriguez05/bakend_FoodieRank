import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";
import { COLLECTION_USUARIO } from "../models/usuario.model.js";

export async function obtenerUsuarios() {
    const db = getDB();
    return await db.collection(COLLECTION_USUARIO).find().toArray();
}

export async function obtenerUsuarioPorId(id) {
    const db = getDB();
    return await db.collection(COLLECTION_USUARIO).findOne({ _id: new ObjectId(id) });
}
