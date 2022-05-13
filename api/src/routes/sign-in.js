const auth0 = require('auth0')

const config = require('../config')

module.exports = async (req, res, next) => {
  try {
    const authenticationClient = new auth0.AuthenticationClient({
      domain: config.auth0.domain,
      clientId: config.auth0.clientId,
      clientSecret: process.env.AUTH0_CLIENT_SECRET
    })

    const data = {
      client_id: config.auth0.clientId,
      username: req.body.username,
      password: req.body.password,
      realm: 'Username-Password-Authentication'
    }

    const response = await authenticationClient.oauth.passwordGrant(data)

    res.json(response)
  } catch (ex) {
    res.sendStatus(400)
  }
}
