import { obtenerUsuarios, obtenerUsuarioPorId } from "../services/usuario.service.js";

export async function getUsuarios_controller(req, res) {
    try {
        const lista = await obtenerUsuarios();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
    }
}

export async function getUsuario_controller(req, res) {
    try {
        const usuario = await obtenerUsuarioPorId(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error: error.message });
    }
}
