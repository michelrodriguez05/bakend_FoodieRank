import {
    crearRestaurante,
    listarRestaurantes,
    obtenerRestaurantePorId,
    actualizarRestaurante,
    eliminarRestaurante,
    aprobarRestaurante,
    listarTodosRestaurantes,
  } from "../services/restaurante.service.js";
  
  export async function crearRestaurante_controller(req, res) {
    try {
      const resultado = await crearRestaurante(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  export async function listarRestaurantes_controller(req, res) {
    try {
      const resultado = await listarRestaurantes(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export async function obtenerRestaurante_controller(req, res) {
    try {
      const resultado = await obtenerRestaurantePorId(req.params.id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  
  export async function actualizarRestaurante_controller(req, res) {
    try {
      const resultado = await actualizarRestaurante(req.params.id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  export async function eliminarRestaurante_controller(req, res) {
    try {
      const resultado = await eliminarRestaurante(req.params.id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  export async function aprobarRestaurante_controller(req, res) {
    try {
      const resultado = await aprobarRestaurante(req.params.id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

export async function listarTodosRestaurantes_controller(req, res) {
  try {
    const resultado = await listarTodosRestaurantes();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  