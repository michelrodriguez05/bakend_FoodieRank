import {
  crearReseña,
  listarReseñasPorRestaurante,
  reaccionarReseña,
  actualizarReseña,
  eliminarReseña,
} from "../services/reseña.service.js";

export async function crearReseña_controller(req, res) {
  try {
    const resultado = await crearReseña(req.body, req.user);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function actualizarReseña_controller(req, res) {
  try {
    const resultado = await actualizarReseña(req.params.id, req.body, req.user._id);
    res.status(200).json(resultado);
  } catch (error) {
    // Si el error es por no estar autorizado, devolvemos 403
    if (error.message.includes("No autorizado")) {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
}

export async function eliminarReseña_controller(req, res) {
  try {
    const resultado = await eliminarReseña(req.params.id, req.user._id);
    res.status(200).json(resultado);
  } catch (error) {
    // Si el error es por no estar autorizado, devolvemos 403
    if (error.message.includes("No autorizado")) {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
}

export async function listarReseñas_controller(req, res) {
  try {
    const resultado = await listarReseñasPorRestaurante(req.params.restauranteId);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function reaccionarReseña_controller(req, res) {
  try {
    const resultado = await reaccionarReseña(req.params.id, req.params.tipo, req.user.id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
