import { crearPlato, listarPlatosPorRestaurante, eliminarPlato } from "../services/plato.service.js";

export async function crearPlato_controller(req, res) {
  try {
    const resultado = await crearPlato(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarPlatosPorRestaurante_controller(req, res) {
  try {
    const resultado = await listarPlatosPorRestaurante(req.params.restauranteId);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function eliminarPlato_controller(req, res) {
  try {
    const resultado = await eliminarPlato(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
