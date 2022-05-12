const AWS = require('aws-sdk')

const isDevelopmentEnvironment = require('./is-development-environment')

const ssm = new AWS.SSM({ region: 'eu-west-1' })

module.exports = async () => {
  const avwxTokenParam = await ssm.getParameter({
    Name: 'aft-avwx-secret',
    WithDecryption: true
  }).promise()

  process.env.AVWX_TOKEN = avwxTokenParam.Parameter.Value

  if (!isDevelopmentEnvironment) {
    const sessionSecretParam = await ssm.getParameter({
      Name: 'aft-session-secret',
      WithDecryption: true
    }).promise()

    process.env.SESSION_SECRET = sessionSecretParam.Parameter.Value

    const auth0ClientSecretParam = await ssm.getParameter({
      Name: 'aft-auth0-client-secret',
      WithDecryption: true
    }).promise()

    process.env.AUTH0_CLIENT_SECRET = auth0ClientSecretParam.Parameter.Value
  }
}
