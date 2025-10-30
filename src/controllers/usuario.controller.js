import { generarToken } from "../utils/jwt.js";
import { registrarUsuario, iniciarSesion, obtenerUsuarios, obtenerUsuarioPorId } from "../services/usuario.service.js";

export async function registro_controller(req, res) {
    try {
        const resultado = await registrarUsuario(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

export async function login_controller(req, res) {
    try {
        const { email, contraseña } = req.body;
        const usuario = await iniciarSesion(email, contraseña);
        const token = generarToken({ id: usuario._id, rol: usuario.rol });
        res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(401).json({ mensaje: error.message });
    }
}

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
