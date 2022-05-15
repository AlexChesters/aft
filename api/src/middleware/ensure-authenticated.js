const { CognitoJwtVerifier } = require('aws-jwt-verify')

const config = require('../config')

const webVerifier = CognitoJwtVerifier.create({
  userPoolId: config.cognito.userPoolId,
  tokenUse: 'access',
  clientId: config.cognito.web.clientId,
  scope: ['email', 'openid']
})
const iosVerifier = CognitoJwtVerifier.create({
  userPoolId: config.cognito.userPoolId,
  tokenUse: 'access',
  clientId: config.cognito.ios.clientId,
  scope: ['email', 'openid']
})

module.exports = async (req, res, next) => {
  const authHeader = req.get('authorization')
  const userAgent = req.get('user-agent')

  if (!authHeader || !userAgent) {
    return res.sendStatus(401)
  }

  const verifier = userAgent.startsWith('ios:aft')
    ? iosVerifier
    : webVerifier

  try {
    const payload = await verifier.verify(authHeader)
    req.user = { userId: payload.sub }
    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(401)
  }
}
