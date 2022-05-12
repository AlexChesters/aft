const passport = require('passport')

module.exports = passport.authenticate('auth0', { scope: 'openid email profile' })
