import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./src/config/db.config.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
});
