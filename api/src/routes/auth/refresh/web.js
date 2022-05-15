const fetch = require('node-fetch')
const { URL } = require('url')

const config = require('../../../config')

module.exports = async (req, res, next) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    res.sendStatus(400)
    return
  }

  const tokenUrl = new URL('/oauth2/token', config.cognito.domain)

  const params = {
    grant_type: 'refresh_token',
    client_id: config.cognito.web.clientId,
    refresh_token: refreshToken
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

  try {
    const tokens = await tokenResponse.json()

    res.json({
      accessToken: tokens.access_token,
      expiresIn: tokens.expires_in
    })
  } catch {
    res.sendStatus(500)
  }
}
