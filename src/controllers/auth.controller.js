import { registrarUsuario, loginUsuario } from "../services/auth.services.js";
import { generarToken } from "../utils/jwt.js";

export async function registrar_controller(req, res) {
  try {
    const data = req.body;
    const resultado = await registrarUsuario(data);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function login_controller(req, res) {
  try {
    const { email, password } = req.body;
    const usuario = await loginUsuario(email, password);
    const token = generarToken({ id: usuario.userId, rol: usuario.rol });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
