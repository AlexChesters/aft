const DynamoDB = require('aws-sdk/clients/dynamodb')

const config = require('../../../config')

module.exports = async (req, res) => {
  const client = new DynamoDB.DocumentClient({ region: 'eu-west-1' })

  if (!req.user) return res.status(401).json({})

  const results = await client.query({
    TableName: config.checklistTableName,
    KeyConditionExpression: 'UserIdentifier = :userId',
    ExpressionAttributeValues: {
      ':userId': req.user.userId
    }
  }).promise()

  const checklist = results.Items[0].Checklists[req.params.identifier]

  res.json(checklist)
}
