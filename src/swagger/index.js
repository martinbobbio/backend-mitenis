const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const pjson = require('../../package.json');

const swaggerDefinition = {
  info: {
    title: 'Servidor Mi Tenis (Esto es una prueba)',
    version: pjson.version,
    description: pjson.description
  },
  host: process.env.HOST,
  basePath: '/api'
};

const options = {
  swaggerDefinition,
  apis: ['src/swagger/docs/**/*.yaml']
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = (path, app) =>
  app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
