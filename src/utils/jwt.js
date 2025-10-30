import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generarToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
}

export function verificarToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}
