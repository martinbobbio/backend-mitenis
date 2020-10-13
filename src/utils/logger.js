const { createLogger, transports, format } = require('winston');
require('colors').enable();

const formatMeta = (meta) =>
  Object.keys(meta)
    .map((key) => ({ [key]: meta[key] }))
    .map((obj) =>
      JSON.stringify(obj)
        .replace(/["{}]/g, '')
        .replace(':', ' : ')
    ) //  eslint-disable-line
    .join(', ');

const myFormat = format.printf(
  ({ level, message, timestamp, ...meta }) =>
    `[${timestamp}][${level.toUpperCase()}]: ${message} ${
      Object.keys(meta).length > 0 ? `|| ${formatMeta(meta)}` : ''
    } ||`
);

const logger = createLogger({
  format: format.json(),
  level: 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.prettyPrint(),
        format.timestamp({
          format: 'HH:mm:ss DD/MM/YY'
        }),
        myFormat
      )
    }),
    new transports.File({ filename: './logs/combined.log' }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error'
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.log' })
  ]
});

logger.stream = {
  write: (message) =>
    logger.info(message.substring(0, message.lastIndexOf('\n')))
};

module.exports = logger;
