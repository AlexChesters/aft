const fetch = require('node-fetch')
const { URL } = require('url')

const config = require('../../../config')

module.exports = async (req, res, next) => {
  const { code } = req.query

  if (!code) {
    res.sendStatus(400)
    return
  }

  const tokenUrl = new URL('/oauth2/token', config.cognito.domain)

  const params = {
    grant_type: 'authorization_code',
    scope: 'email%20openid',
    redirect_uri: config.cognito.web.redirectUri,
    client_id: config.cognito.web.clientId,
    code
  }

  const form = Object
    .keys(params)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    })
    .join('&')

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: form
  })

  res.json(await tokenResponse.json())
}
