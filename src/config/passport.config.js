import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { getDB } from "./db.config.js";
import { ObjectId } from "mongodb";

dotenv.config();

const opciones = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export const estrategiaJwt = new JwtStrategy(opciones, async (payload, done) => {
    try {
        const db = getDB();
        const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(payload.id) });
        if (!usuario) return done(null, false);
        return done(null, usuario);
    } catch (error) {
        return done(error, false);
    }
});
