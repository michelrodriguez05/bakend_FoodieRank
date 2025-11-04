import swaggerUi from "swagger-ui-express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Truco para obtener el __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Construir la ruta al archivo JSON
const swaggerFilePath = path.join(__dirname, 'swagger-spec.json');

// 2. Leer el archivo de forma síncrona
const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8');

// 3. Parsear el JSON
const swaggerSpecs = JSON.parse(swaggerFile);

// 4. Exportar
export const swaggerUiSetup = swaggerUi;
export { swaggerSpecs };