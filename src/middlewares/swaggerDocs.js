import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
      description: 'Simple chat backend with auto-response quotes',
    },
  },
  apis: ['./src/routers/*.js'], // adjust to your routes
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = () =>
  swaggerUi.serveFiles(swaggerSpec, {}) && swaggerUi.setup(swaggerSpec);
