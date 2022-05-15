const { CognitoJwtVerifier } = require('aws-jwt-verify')

const config = require('../config')

const webVerifier = CognitoJwtVerifier.create({
  userPoolId: config.cognito.userPoolId,
  tokenUse: 'access',
  clientId: config.cognito.web.clientId,
  scope: ['email', 'openid']
})

module.exports = async (req, res, next) => {
  const authHeader = req.get('authorization')

  if (!authHeader) {
    return res.sendStatus(401)
  }

  try {
    const payload = await webVerifier.verify(authHeader)
    req.user = { userId: payload.sub }
    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(401)
  }
}
