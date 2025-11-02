// seed.js
import { getDB, connectDB, closeDB } from "./src/config/db.config.js";
import { ObjectId } from "mongodb";

async function seedData() {
  await connectDB();
  const db = getDB();

  try {
    console.log("🌱 Iniciando carga de datos de ejemplo...");

    // 1️⃣ Limpieza de colecciones
    await db.collection("usuarios").deleteMany({});
    await db.collection("categorías").deleteMany({});
    await db.collection("restaurantes").deleteMany({});
    await db.collection("reseñas").deleteMany({});

    // 2️⃣ Inserción de usuarios
    const usuarios = [
      { _id: new ObjectId(), nombre: "Michel Rodrigue", rol: "admin", email: "admin@foodie.com" },
      { _id: new ObjectId(), nombre: "Laura Pérez", rol: "usuario", email: "laura@foodie.com" },
      { _id: new ObjectId(), nombre: "Carlos López", rol: "usuario", email: "carlos@foodie.com" },
    ];
    await db.collection("usuarios").insertMany(usuarios);

    // 3️⃣ Inserción de categorías
    const categorias = [
      { _id: new ObjectId(), nombre: "Comida rápida" },
      { _id: new ObjectId(), nombre: "Gourmet" },
      { _id: new ObjectId(), nombre: "Vegetariana" },
      { _id: new ObjectId(), nombre: "Sushi" },
    ];
    await db.collection("categorías").insertMany(categorias);

    // 4️⃣ Inserción de restaurantes
    const restaurantes = [
      {
        _id: new ObjectId(),
        nombre: "Burger House",
        categoria: "Comida rápida",
        ubicacion: "Cra 10 #45-20",
        imagen: "https://example.com/burgerhouse.jpg",
      },
      {
        _id: new ObjectId(),
        nombre: "La Parrilla Gourmet",
        categoria: "Gourmet",
        ubicacion: "Calle 12 #34-10",
        imagen: "https://example.com/parrilla.jpg",
      },
      {
        _id: new ObjectId(),
        nombre: "Green Taste",
        categoria: "Vegetariana",
        ubicacion: "Av. Los Alpes #22-44",
        imagen: "https://example.com/green.jpg",
      },
      {
        _id: new ObjectId(),
        nombre: "Tokyo Sushi",
        categoria: "Sushi",
        ubicacion: "Calle 8 #11-30",
        imagen: "https://example.com/sushi.jpg",
      },
    ];
    await db.collection("restaurantes").insertMany(restaurantes);

    // 5️⃣ Inserción de reseñas
    const reseñas = [
      {
        restauranteId: restaurantes[0]._id,
        usuarioId: usuarios[1]._id,
        calificacion: 5,
        comentario: "Las hamburguesas son espectaculares 😋",
        likes: 15,
        dislikes: 2,
        fecha: new Date("2025-10-10"),
      },
      {
        restauranteId: restaurantes[0]._id,
        usuarioId: usuarios[2]._id,
        calificacion: 4,
        comentario: "Buena atención, pero algo demorado.",
        likes: 8,
        dislikes: 1,
        fecha: new Date("2025-10-15"),
      },
      {
        restauranteId: restaurantes[1]._id,
        usuarioId: usuarios[1]._id,
        calificacion: 5,
        comentario: "Excelente experiencia, comida deliciosa y elegante 🍷",
        likes: 20,
        dislikes: 0,
        fecha: new Date("2025-10-18"),
      },
      {
        restauranteId: restaurantes[2]._id,
        usuarioId: usuarios[2]._id,
        calificacion: 3,
        comentario: "Comida saludable, pero porciones pequeñas.",
        likes: 4,
        dislikes: 5,
        fecha: new Date("2025-10-20"),
      },
      {
        restauranteId: restaurantes[3]._id,
        usuarioId: usuarios[1]._id,
        calificacion: 4,
        comentario: "Sushi fresco y de buen sabor 🍣",
        likes: 10,
        dislikes: 1,
        fecha: new Date("2025-10-22"),
      },
    ];
    await db.collection("reseñas").insertMany(reseñas);

    console.log("✅ Datos insertados correctamente en la base de datos.");
  } catch (error) {
    console.error("❌ Error cargando los datos:", error);
  } finally {
    await closeDB();
  }
}

seedData();
