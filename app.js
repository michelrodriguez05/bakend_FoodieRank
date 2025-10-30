import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "passport";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import { swaggerSpecs, swaggerUiSetup } from "./src/config/swagger.config.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(`/api/${process.env.API_VERSION}/usuarios`, usuarioRoutes);
app.use("/api/docs", swaggerUiSetup.serve, swaggerUiSetup.setup(swaggerSpecs));

app.get("/", (req, res) => res.send("Bienvenido a FoodieRank API 🚀"));

export default app;
