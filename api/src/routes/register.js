const auth0 = require('auth0')

const config = require('../config')

module.exports = async (req, res, next) => {
  const authenticationClient = new auth0.AuthenticationClient({
    domain: config.auth0.domain,
    clientId: config.auth0.clientId,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
  })

  const data = {
    email: req.body.username,
    password: req.body.password,
    connection: 'Username-Password-Authentication'
  }

  const response = await authenticationClient.database.signUp(data)

  res.json(response)
}
