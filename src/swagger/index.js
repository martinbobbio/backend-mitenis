const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'Servidor Mi Tenis',
    version: '1.0.0',
    description: 'Servidor para la aplicación "Mi Tenis"'
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
