import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Configuración base
app.use(express.json());
app.use(cors());

// Limitar peticiones 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de peticiones por IP
});
app.use(limiter);

//Swagger
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup({}, { explorer: true }));

//Ruta base temporal para probar
app.get("/", (req, res) => {
  res.json({
    message: "🍔 Bienvenido a FoodieRank API",
    status: "online",
  });
});

export default app;


