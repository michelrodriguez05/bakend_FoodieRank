import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import { swaggerUi, swaggerSpecs } from "./config/swagger.config.js";

// Importar rutas
import usuarioRoutes from "./routes/usuario.routes.js";
import restauranteRoutes from "./routes/restaurante.routes.js";
import platoRoutes from "./routes/plato.routes.js";
import reseñaRoutes from "./routes/reseña.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a BD
connectDB();

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/restaurantes", restauranteRoutes);
app.use("/api/platos", platoRoutes);
app.use("/api/reseñas", reseñaRoutes);
app.use("/api/categorias", categoriaRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
