import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

export async function getUsuarios_controller(req, res, next) {
    try {
        const db = getDB();
        const lista = await db.collection("usuarios").find().toArray();
        res.status(200).json(lista);
    } catch (error) {
        // Pasa el error al middleware centralizado para un manejo consistente
        next(error);
    }
}

export async function getUsuario_controller(req, res, next) {
    try {
        const db = getDB();
        // Validar que el ID es un ObjectId válido antes de la consulta
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: "ID de usuario no válido" });
        }
        const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(req.params.id) });
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}
