//  This file will define the OpenAPI settings, tell swagger - jsdoc where to find your route comments, and write the generated documentation to swagger.json

import { writeFileSync } from 'node:fs';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kizuna Rail API',
            version: '1.0.0',
            description: 'API for working with Kizuna Rail data, including bookings, trains, and stations.',
        },
        servers: [
            {
                url: '/',
                description: 'Current server'
            }
        ]
    },
    apis: ['./src/routes/api-routes.js', './app.js']
};

const swaggerSpec = swaggerJsdoc(options);

writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger documentation generated.');