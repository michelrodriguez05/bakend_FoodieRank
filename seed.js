// seed.js
import { getDB, connectDB, closeDB } from "./src/config/db.config.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function seedData() {
  await connectDB();
  const db = getDB();

  try {
    console.log("🌱 Iniciando carga de datos de ejemplo...");

    // 1️⃣ Limpieza de colecciones
    await db.collection("usuarios").deleteMany({});
    await db.collection("categorias").deleteMany({}); // Corregido: sin tilde
    await db.collection("restaurantes").deleteMany({});
    await db.collection("platos").deleteMany({}); // Añadido: limpiar platos
    await db.collection("reseñas").deleteMany({});

    // 2️⃣ Inserción de usuarios (CON CONTRASEÑAS HASHEADAS)
    // Contraseñas para pruebas:
    // admin@foodie.com -> admin123
    // laura@foodie.com  -> laura123
    // carlos@foodie.com -> carlos123
    const usuarios = [
      { 
        _id: new ObjectId(), 
        nombre: "Michel Admin", 
        rol: "admin", 
        email: "admin@foodie.com",
        password: await hashPassword("admin123"),
        creadoEn: new Date()
      },
      { 
        _id: new ObjectId(), 
        nombre: "Laura Pérez", 
        rol: "usuario", 
        email: "laura@foodie.com",
        password: await hashPassword("laura123"),
        creadoEn: new Date()
      },
      { 
        _id: new ObjectId(), 
        nombre: "Carlos López", 
        rol: "usuario", 
        email: "carlos@foodie.com",
        password: await hashPassword("carlos123"),
        creadoEn: new Date()
      },
    ];
    await db.collection("usuarios").insertMany(usuarios);
    console.log("👤 Usuarios insertados (admin: admin123, laura: laura123, carlos: carlos123)");

    // 3️⃣ Inserción de categorías
    const categorias = [
      { _id: new ObjectId(), nombre: "Comida rápida", descripcion: "Hamburguesas, perros calientes, etc.", creadoEn: new Date() },
      { _id: new ObjectId(), nombre: "Gourmet", descripcion: "Platos de alta cocina.", creadoEn: new Date() },
      { _id: new ObjectId(), nombre: "Vegetariana", descripcion: "Comida sin carne.", creadoEn: new Date() },
      { _id: new ObjectId(), nombre: "Sushi", descripcion: "Comida japonesa.", creadoEn: new Date() },
      { _id: new ObjectId(), nombre: "Italiana", descripcion: "Pasta y pizza.", creadoEn: new Date() },
    ];
    await db.collection("categorias").insertMany(categorias); // Corregido: sin tilde
    console.log("📚 Categorías insertadas");

    // 4️⃣ Inserción de restaurantes (CON ESTADO DE APROBACIÓN)
    const restaurantes = [
      {
        _id: new ObjectId(),
        nombre: "Burger House",
        descripcion: "Las mejores hamburguesas de la ciudad.",
        categoria: categorias[0].nombre, // Comida rápida
        ubicacion: "Cra 10 #45-20",
        imagen: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop",
        aprobado: true, // Aprobado para que aparezca en la lista
        creadoEn: new Date()
      },
      {
        _id: new ObjectId(),
        nombre: "La Parrilla Gourmet",
        descripcion: "Cortes de carne premium.",
        categoria: categorias[1].nombre, // Gourmet
        ubicacion: "Calle 12 #34-10",
        imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
        aprobado: true, // Aprobado
        creadoEn: new Date()
      },
      {
        _id: new ObjectId(),
        nombre: "Green Taste",
        descripcion: "Opciones saludables y vegetarianas.",
        categoria: categorias[2].nombre, // Vegetariana
        ubicacion: "Av. Los Alpes #22-44",
        imagen: "https://images.unsplash.com/photo-1490645935967-10de6ba1a033?q=80&w=2070&auto=format&fit=crop",
        aprobado: true, // Aprobado
        creadoEn: new Date()
      },
      {
        _id: new ObjectId(),
        nombre: "Mama Mia Pizzeria",
        descripcion: "Auténtica pizza italiana.",
        categoria: categorias[4].nombre, // Italiana
        ubicacion: "Calle 5 #15-30",
        imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
        aprobado: false, // PENDIENTE DE APROBACIÓN (para probar el admin)
        creadoEn: new Date()
      },
    ];
    await db.collection("restaurantes").insertMany(restaurantes);
    console.log("🍽️ Restaurantes insertados (3 aprobados, 1 pendiente)");

    // 5️⃣ Inserción de Platos (NUEVO)
    const platos = [
        { _id: new ObjectId(), nombre: "Hamburguesa Clásica", precio: 15000, restauranteId: restaurantes[0]._id, creadoEn: new Date() },
        { _id: new ObjectId(), nombre: "Hamburguesa Doble", precio: 22000, restauranteId: restaurantes[0]._id, creadoEn: new Date() },
        { _id: new ObjectId(), nombre: "Punta de Anca", precio: 45000, restauranteId: restaurantes[1]._id, creadoEn: new Date() },
        { _id: new ObjectId(), nombre: "Ensalada César Veggie", precio: 25000, restauranteId: restaurantes[2]._id, creadoEn: new Date() },
        { _id: new ObjectId(), nombre: "Bowl de Quinoa", precio: 28000, restauranteId: restaurantes[2]._id, creadoEn: new Date() },
    ];
    await db.collection("platos").insertMany(platos);
    console.log("🍲 Platos insertados");

    // 6️⃣ Inserción de reseñas (CON LÓGICA LIKEDBY/DISLIKEDBY)
    const reseñas = [
      {
        _id: new ObjectId(),
        restauranteId: restaurantes[0]._id, // Burger House
        usuarioId: usuarios[1]._id, // Laura
        calificacion: 5,
        comentario: "Las hamburguesas son espectaculares 😋",
        likedBy: [usuarios[2]._id], // A Carlos le gustó
        dislikedBy: [],
        fecha: new Date("2025-10-10"),
      },
      {
        _id: new ObjectId(),
        restauranteId: restaurantes[0]._id, // Burger House
        usuarioId: usuarios[2]._id, // Carlos
        calificacion: 4,
        comentario: "Buena atención, pero algo demorado.",
        likedBy: [],
        dislikedBy: [],
        fecha: new Date("2025-10-15"),
      },
      {
        _id: new ObjectId(),
        restauranteId: restaurantes[1]._id, // La Parrilla
        usuarioId: usuarios[1]._id, // Laura
        calificacion: 5,
        comentario: "Excelente experiencia, comida deliciosa y elegante 🍷",
        likedBy: [usuarios[0]._id, usuarios[2]._id], // Al Admin y a Carlos les gustó
        dislikedBy: [],
        fecha: new Date("2025-10-18"),
      },
      {
        _id: new ObjectId(),
        restauranteId: restaurantes[2]._id, // Green Taste
        usuarioId: usuarios[2]._id, // Carlos
        calificacion: 3,
        comentario: "Comida saludable, pero porciones pequeñas.",
        likedBy: [usuarios[1]._id], // A Laura le gustó
        dislikedBy: [], // A nadie le disgustó
        fecha: new Date("2025-10-20"),
      },
      {
        _id: new ObjectId(),
        restauranteId: restaurantes[2]._id, // Green Taste
        usuarioId: usuarios[1]._id, // Laura
        calificacion: 2,
        comentario: "No me gustó el sabor del aderezo.",
        likedBy: [],
        dislikedBy: [usuarios[2]._id], // A Carlos le disgustó
        fecha: new Date("2025-10-22"),
      },
    ];
    await db.collection("reseñas").insertMany(reseñas);
    console.log("🌟 Reseñas insertadas (con sistema de likes/dislikes)");

    console.log("✅ Datos insertados correctamente en la base de datos.");
  } catch (error) {
    console.error("❌ Error cargando los datos:", error);
  } finally {
    await closeDB();
  }
}

seedData();