import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "passport";

// --- IMPORTAR TODAS LAS RUTAS ---
import usuarioRoutes from "./src/routes/usuario.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import categoriaRoutes from "./src/routes/categoria.routes.js";
import restauranteRoutes from "./src/routes/restaurante.routes.js";
import platoRoutes from "./src/routes/plato.routes.js";
import resenaRoutes from "./src/routes/resena.routes.js";
import rankingRoutes from "./src/routes/ranking.routes.js";
// --- FIN IMPORTACIONES ---

import { swaggerSpecs, swaggerUiSetup } from "./src/config/swagger.config.js";
import { estrategiaJwt } from "./src/config/passport.config.js";

const app = express();

app.use(express.json());
app.use(cors());

// Cargar y registrar la estrategia JWT en Passport
passport.use(estrategiaJwt);
app.use(passport.initialize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Rutas de la API versionadas
const apiVersion = process.env.API_VERSION || 'v1';

// --- REGISTRAR TODAS LAS RUTAS ---
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/usuarios`, usuarioRoutes);
app.use(`/api/${apiVersion}/categorias`, categoriaRoutes);
app.use(`/api/${apiVersion}/restaurantes`, restauranteRoutes);
app.use(`/api/${apiVersion}/platos`, platoRoutes);
app.use(`/api/${apiVersion}/resenas`, resenaRoutes);
app.use(`/api/${apiVersion}/ranking`, rankingRoutes);
// --- FIN REGISTRO ---

// Ruta de la documentación (no necesita versionado)
// Ahora usará el JSON que leímos con 'fs'
app.use("/docs", swaggerUiSetup.serve, swaggerUiSetup.setup(swaggerSpecs));

app.get("/", (req, res) => res.send("Bienvenido a FoodieRank API 🚀"));

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

export default app;