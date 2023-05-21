const winston = require('winston')

const config = require('../config')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: config.logFilePath }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})

module.exports = (message, data) => logger.info({ message, data })
