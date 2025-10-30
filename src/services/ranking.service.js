import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

/**
 * Pesos configurables (ajústalos según necesidad)
 */
const W_PROMEDIO = 0.7;
const W_LIKES = 0.2;
const W_RECENCY = 0.1;

/**
 * Devuelve ranking ordenado por score descendente.
 * Opciones: { top: Number } - si top definido, devuelve top N.
 */
export async function calcularRanking({ top = 10 } = {}) {
  const db = getDB();

  // Aggregation:
  // 1) Agrupar reseñas por restaurante: avg calificacion, total reseñas, suma de likes, suma de dislikes, avg edad (en días)
  // 2) Lookup restaurante para obtener nombre, ubicacion, categoria
  // 3) Calcular score según pesos
  const ahora = new Date();

  const pipeline = [
    {
      $group: {
        _id: "$restauranteId",
        promedio_calificacion: { $avg: "$calificacion" },
        total_reseñas: { $sum: 1 },
        suma_likes: { $sum: "$likes" },
        suma_dislikes: { $sum: "$dislikes" },
        // calcular edad promedio en días: promedio de (ahora - fecha)/msPorDia
        avg_fecha: { $avg: "$fecha" },
      },
    },
    {
      $addFields: {
        avg_fecha: {
          $toDate: "$avg_fecha",
        },
      },
    },
    {
      $addFields: {
        // edad promedio en días
        edad_promedio_dias: {
          $divide: [{ $subtract: [now, "$avg_fecha"] }, 1000 * 60 * 60 * 24],
        },
      },
    },
    {
      $lookup: {
        from: "restaurantes",
        localField: "_id",
        foreignField: "_id",
        as: "restaurante",
      },
    },
    { $unwind: "$restaurante" },
    {
      $project: {
        restauranteId: "$_id",
        nombre: "$restaurante.nombre",
        categoria: "$restaurante.categoria",
        ubicacion: "$restaurante.ubicacion",
        promedio_calificacion: { $ifNull: ["$promedio_calificacion", 0] },
        total_reseñas: 1,
        suma_likes: 1,
        suma_dislikes: 1,
        edad_promedio_dias: 1,
        // recencyScore = 1 / (1 + edad_promedio_dias) -> entre 0..1, mayor si es reciente
        recencyScore: {
          $divide: [1, { $add: [1, { $cond: [{ $lt: ["$edad_promedio_dias", 0] }, 0, "$edad_promedio_dias"] }] }],
        },
      },
    },
    {
      $addFields: {
        score: {
          $add: [
            { $multiply: ["$promedio_calificacion", W_PROMEDIO] },
            { $multiply: [{ $subtract: ["$suma_likes", "$suma_dislikes"] }, W_LIKES] },
            { $multiply: ["$recencyScore", W_RECENCY] },
          ],
        },
      },
    },
    { $sort: { score: -1 } },
    { $limit: top },
    {
      $project: {
        _id: 0,
        restauranteId: { $toString: "$restauranteId" },
        nombre: 1,
        categoria: 1,
        ubicacion: 1,
        promedio_calificacion: 1,
        total_reseñas: 1,
        suma_likes: 1,
        suma_dislikes: 1,
        edad_promedio_dias: 1,
        score: 1,
      },
    },
  ];

  const resultado = await db.collection("reseñas").aggregate(pipeline).toArray();
  return resultado;
}

/**
 * Opción: calcular ranking para 1 restaurante
 */
export async function calcularRankingPorRestaurante(restauranteId) {
  const db = getDB();
  const pipeline = [
    { $match: { restauranteId: new ObjectId(restauranteId) } },
    {
      $group: {
        _id: "$restauranteId",
        promedio_calificacion: { $avg: "$calificacion" },
        total_reseñas: { $sum: 1 },
        suma_likes: { $sum: "$likes" },
        suma_dislikes: { $sum: "$dislikes" },
        avg_fecha: { $avg: "$fecha" },
      },
    },
    {
      $addFields: {
        avg_fecha: { $toDate: "$avg_fecha" },
      },
    },
    {
      $addFields: {
        edad_promedio_dias: {
          $divide: [{ $subtract: [new Date(), "$avg_fecha"] }, 1000 * 60 * 60 * 24],
        },
      },
    },
    {
      $project: {
        promedio_calificacion: { $ifNull: ["$promedio_calificacion", 0] },
        total_reseñas: 1,
        suma_likes: 1,
        suma_dislikes: 1,
        edad_promedio_dias: 1,
        recencyScore: {
          $divide: [1, { $add: [1, { $cond: [{ $lt: ["$edad_promedio_dias", 0] }, 0, "$edad_promedio_dias"] }] }],
        },
      },
    },
    {
      $addFields: {
        score: {
          $add: [
            { $multiply: ["$promedio_calificacion", W_PROMEDIO] },
            { $multiply: [{ $subtract: ["$suma_likes", "$suma_dislikes"] }, W_LIKES] },
            { $multiply: ["$recencyScore", W_RECENCY] },
          ],
        },
      },
    },
  ];

  const [doc] = await db.collection("reseñas").aggregate(pipeline).toArray();
  return doc || {
    promedio_calificacion: 0,
    total_reseñas: 0,
    suma_likes: 0,
    suma_dislikes: 0,
    edad_promedio_dias: null,
    score: 0,
  };
}
