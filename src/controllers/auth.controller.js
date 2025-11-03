import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.config.js";

export async function registrar_controller(req, res, next) {
  try {
    const { nombre, email, password } = req.body;
    const db = getDB();
    const coleccion = db.collection("usuarios");

    // 1. Verificar si el usuario ya existe
    const usuarioExistente = await coleccion.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ message: "El correo electrónico ya está en uso" });
    }

    // 2. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHasheada = await bcrypt.hash(password, salt);

    // 3. Crear el nuevo usuario
    const resultado = await coleccion.insertOne({
      nombre,
      email,
      password: passwordHasheada,
      rol: "user", // Asignar rol por defecto
    });

    res.status(201).json({ message: "Usuario registrado con éxito", userId: resultado.insertedId });
  } catch (error) {
    next(error); // Pasa el error a tu middleware centralizado
  }
}

export async function login_controller(req, res, next) {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const coleccion = db.collection("usuarios");

    // 1. Buscar al usuario por email
    const usuario = await coleccion.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" }); // Mensaje genérico por seguridad
    }

    // 2. Comparar la contraseña
    const esPasswordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!esPasswordCorrecta) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Generar el Token JWT
    const payload = { id: usuario._id, rol: usuario.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    next(error);
  }
}