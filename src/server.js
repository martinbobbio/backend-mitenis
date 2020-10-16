const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const morgan = require('morgan');
const swagger = require('./swagger');
const pjson = require('../package.json');
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./utils/logger');
let clubRoute = require('./routes/club/club.routes');

require('colors').enable();

dotenxv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 8082;

if (process.env.ENV !== 'prod') {
  swagger('/swagger', app);
}

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next();
});

app.use(express.json());
app.use(morgan('dev', { stream: logger.stream }));

app.use(
  fileUpload({
    debug: false
  })
);

app.use('/api/clubs', clubRoute);

app.get('/health', (req, res) => res.json({ success: 'true' }));

app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Backend Mi Tenis v${pjson.version} running in ${process.env.NODE_ENV} mode on Port: ${PORT}`);
});

module.exports = {
  app,
  server
};
