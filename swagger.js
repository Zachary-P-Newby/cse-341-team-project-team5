import { writeFileSync } from 'node:fs';
import swaggerJsdoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kizuna Rail API',
      version: '1.0.0',
      description: 'API for exploring scenic rail trips and trains across the Kizuna Rail network'
    },
    servers: [
      {
        url: '/',
        description: 'Current server'
      }
    ]
  },
  // Scans all route files, controllers, and server.js for @swagger JSDoc comments
  apis: ['./src/routes/*.js', './src/controllers/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(options);

writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger documentation generated.');