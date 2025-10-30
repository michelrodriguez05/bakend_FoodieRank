import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const opciones = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API FoodieRank",
            version: "1.0.0",
            description: "Documentación de la API FoodieRank"
        },
    },
    apis: ["./src/routes/*.js"],
};

export const swaggerSpecs = swaggerJSDoc(opciones);
export const swaggerUiSetup = swaggerUi;
