import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const opciones = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API FoodieRank",
      version: "1.0.0",
      description: "Documentación del backend de FoodieRank 🍔",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(opciones);
export { swaggerUi, swaggerSpecs };
