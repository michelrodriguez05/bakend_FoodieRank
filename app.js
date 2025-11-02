import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "passport";
import { estrategiaJwt } from "./src/config/passport.config.js";
import { swaggerSpecs, swaggerUiSetup } from "./src/config/swagger.config.js";

// Importar todas las rutas
import authRoutes from "./src/routes/auth.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import categoriaRoutes from "./src/routes/categoria.routes.js";
import restauranteRoutes from "./src/routes/restaurante.routes.js";
import platoRoutes from "./src/routes/plato.routes.js";
import reseñaRoutes from "./src/routes/reseña.routes.js";
import rankingRoutes from "./src/routes/ranking.routes.js";

const app = express();
const API_VERSION = process.env.API_VERSION || "v1";

app.use(express.json());
app.use(cors());

// Configuración de Passport
app.use(passport.initialize());
passport.use(estrategiaJwt);

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Registrar todas las rutas
app.use("/auth", authRoutes);
app.use(`/api/${API_VERSION}/usuarios`, usuarioRoutes);
app.use(`/api/${API_VERSION}/categorias`, categoriaRoutes);
app.use(`/api/${API_VERSION}/restaurantes`, restauranteRoutes);
app.use(`/api/${API_VERSION}/platos`, platoRoutes);
app.use(`/api/${API_VERSION}/reseñas`, reseñaRoutes);
app.use(`/api/${API_VERSION}/ranking`, rankingRoutes);
app.use("/api/docs", swaggerUiSetup.serve, swaggerUiSetup.setup(swaggerSpecs));

app.get("/", (req, res) => res.send("Bienvenido a FoodieRank API 🚀"));

export default app;
