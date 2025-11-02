import { registrarUsuario, loginUsuario } from "../services/auth.service.js";

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
    const resultado = await loginUsuario(email, password);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
