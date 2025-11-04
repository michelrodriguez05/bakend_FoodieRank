// Importamos los servicios REAles
import { registrarUsuario, loginUsuario } from "../services/auth.service.js";

export async function registrar_controller(req, res, next) {
  try {
    const data = req.body;
    const resultado = await registrarUsuario(data);
    res.status(201).json(resultado);
  } catch (error) {
    if (error.message.includes("registrado")) {
      return res.status(409).json({ message: error.message });
    }
    next(error); 
  }
}

export async function login_controller(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultado = await loginUsuario(email, password);
    res.status(200).json(resultado);
  } catch (error) {
    if (error.message.includes("encontrado") || error.message.includes("incorrecta")) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    next(error);
  }
}