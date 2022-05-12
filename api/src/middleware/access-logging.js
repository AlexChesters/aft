const log = require('../utils/log')

module.exports = (req, res, next) => {
  log('request', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.path
  })
  next()
}
