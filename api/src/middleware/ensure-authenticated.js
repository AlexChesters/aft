const auth0 = require('auth0')

const config = require('../config')

module.exports = async (req, res, next) => {
  const accessToken = req.get('authorization')

  if (!accessToken) {
    return res.sendStatus(401)
  }

  const authenticationClient = new auth0.AuthenticationClient({
    domain: config.auth0.domain,
    clientId: config.auth0.clientId,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
  })

  const response = await authenticationClient.getProfile(accessToken)

  req.user = { userId: response.sub }

  next()
}
