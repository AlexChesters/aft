const refresh = require('./')
const config = require('../../../config')

module.exports = refresh(config.cognito.ios.clientId)
