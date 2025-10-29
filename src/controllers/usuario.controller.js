import * as usuarioService from "../services/usuario.service.js";
import { respuestaExitosa, respuestaError } from "../utils/response.js";

export const registrar = async (req, res) => {
  try {
    const data = await usuarioService.registrarUsuario(req.body);
    respuestaExitosa(res, data, "Usuario registrado correctamente");
  } catch (error) {
    respuestaError(res, error, 400);
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const data = await usuarioService.loginUsuario(correo, contraseña);
    respuestaExitosa(res, data, "Inicio de sesión exitoso");
  } catch (error) {
    respuestaError(res, error, 400);
  }
};
