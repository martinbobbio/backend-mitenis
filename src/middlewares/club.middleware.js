const axios = require('axios').default;
const asyncHandler = require('../middlewares/async.middleware');
const logger = require('../utils/logger');

const clubMiddleware = asyncHandler(async (req, res, next) => {

  const { lat,lng } = req.params;
  
  const response = await axios.get(`${process.env.URL_GOOGLE_PLACES}?location=${lat},${lng}&radius=5000&name=tenis&key=${process.env.TOKEN_GOOGLE_MAPS}`);

  logger.info(`(GOOGLE MAP CLUB TENIS)\nSTATUS: ${response.status}\nURL: ${response.config.url}\nMETHOD: ${response.config.method}\nDATA: ${response.data}`);

  req.clubs = {
    ...response.data
  };

  return next();
});

module.exports = {
  clubMiddleware
};