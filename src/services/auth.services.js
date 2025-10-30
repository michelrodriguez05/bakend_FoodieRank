// En una aplicación real, aquí te conectarías a tu base de datos.
// Por ahora, usaremos un arreglo en memoria para simularla.
const users = [];

/**
 * Registra un nuevo usuario.
 * @param {object} data - Datos del usuario (nombre, email, password).
 */
export async function registrarUsuario(data) {
  const { email, password, nombre } = data;

  // Validación básica
  if (!email || !password || !nombre) {
    throw new Error("Faltan datos para el registro.");
  }

  // Verificar si el usuario ya existe
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  // En una aplicación real, deberías "hashear" la contraseña antes de guardarla.
  const newUser = { id: Date.now(), nombre, email, password };
  users.push(newUser);

  console.log("Usuario registrado:", newUser);

  // No devuelvas la contraseña en la respuesta
  return { id: newUser.id, nombre: newUser.nombre, email: newUser.email };
}

/**
 * Inicia sesión de un usuario.
 * @param {string} email - Email del usuario.
 * @param {string} password - Contraseña del usuario.
 */
export async function loginUsuario(email, password) {
  // Validación básica
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos.");
  }

  const user = users.find(user => user.email === email);

  // En una aplicación real, compararías la contraseña hasheada.
  if (!user || user.password !== password) {
    throw new Error("Credenciales inválidas.");
  }

  return { message: "Login exitoso", userId: user.id };
}