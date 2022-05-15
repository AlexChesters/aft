const AWS = require('aws-sdk')

const ssm = new AWS.SSM({ region: 'eu-west-1' })

module.exports = async () => {
  const avwxTokenParam = await ssm.getParameter({
    Name: 'aft-avwx-secret',
    WithDecryption: true
  }).promise()

  process.env.AVWX_TOKEN = avwxTokenParam.Parameter.Value
}
