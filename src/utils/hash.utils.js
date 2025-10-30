import bcrypt from "bcrypt";

export async function encriptarPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function compararPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
