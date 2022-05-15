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
    redirect_uri: config.cognito.ios.redirectUri,
    client_id: config.cognito.ios.clientId,
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

  try {
    const tokens = await tokenResponse.json()
    const destinationUri = new URL(config.cognito.web.destinationUri)

    destinationUri.searchParams.append('access_token', tokens.access_token)
    destinationUri.searchParams.append('refresh_token', tokens.refresh_token)
    destinationUri.searchParams.append('expires_in', tokens.expires_in)

    res.redirect(destinationUri.toString())
  } catch {
    res.sendStatus(500)
  }
}
