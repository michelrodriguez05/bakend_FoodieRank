import {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  } from "../services/categoria.service.js";
  
  export async function getCategorias_controller(req, res) {
    try {
      const result = await obtenerCategorias();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en getCategorias_controller:", error);
      res.status(500).json({ mensaje: "Error al obtener categorías", error: error.message });
    }
  }
  
  export async function getCategoria_controller(req, res) {
    try {
      const { id } = req.params;
      const result = await obtenerCategoriaPorId(id);
      if (!result) return res.status(404).json({ mensaje: "Categoría no encontrada" });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en getCategoria_controller:", error);
      res.status(500).json({ mensaje: "Error al obtener categoría", error: error.message });
    }
  }
  
  export async function createCategoria_controller(req, res) {
    try {
      const data = req.body;
      const result = await crearCategoria(data);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error en createCategoria_controller:", error);
      res.status(400).json({ mensaje: "Error creando categoría", error: error.message });
    }
  }
  
  export async function updateCategoria_controller(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await actualizarCategoria(id, data);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en updateCategoria_controller:", error);
      res.status(400).json({ mensaje: "Error actualizando categoría", error: error.message });
    }
  }
  
  export async function deleteCategoria_controller(req, res) {
    try {
      const { id } = req.params;
      const result = await eliminarCategoria(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en deleteCategoria_controller:", error);
      res.status(400).json({ mensaje: "Error eliminando categoría", error: error.message });
    }
  }
  