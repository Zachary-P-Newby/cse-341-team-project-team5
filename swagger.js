import { writeFileSync } from 'node:fs';
import swaggerJsddoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
        title: 'Kizuna Rail API',
        version: '1.0.0',
        description: 'Japanese Railway Booking Website API',
    },
    servers: [
        {
            url: '/',
            description: 'Current server'
        }
    ],
  },
  apis: ['./src/routes/router.js', './src/routes/api-routes.js', './src/routes/ejs-routes.js', './app.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsddoc(options);
writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger documentation generated successfully!');
