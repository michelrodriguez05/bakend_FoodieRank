import { calcularRanking, calcularRankingPorRestaurante } from "../services/ranking.service.js";

export async function getRanking_controller(req, res) {
  try {
    const top = req.query.top ? parseInt(req.query.top, 10) : 10;
    const resultado = await calcularRanking({ top });
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error en getRanking_controller:", error);
    res.status(500).json({ mensaje: "Error al calcular ranking", error: error.message });
  }
}

export async function getRankingRestaurante_controller(req, res) {
  try {
    const { id } = req.params;
    const resultado = await calcularRankingPorRestaurante(id);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error en getRankingRestaurante_controller:", error);
    res.status(500).json({ mensaje: "Error al calcular ranking del restaurante", error: error.message });
  }
}
