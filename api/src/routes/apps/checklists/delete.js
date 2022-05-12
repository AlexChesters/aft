const DynamoDB = require('aws-sdk/clients/dynamodb')

const config = require('../../../config')

const client = new DynamoDB.DocumentClient({ region: 'eu-west-1' })

module.exports = async (req, res) => {
  if (!req.user) return res.status(401).json({})

  const identifier = req.body.identifier

  await client.update({
    TableName: config.checklistTableName,
    Key: { UserIdentifier: req.user.userId },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'REMOVE #checklists.#checklist_identifier',
    ExpressionAttributeNames: {
      '#checklists': 'Checklists',
      '#checklist_identifier': identifier
    }
  }).promise()

  res.status(201).json({ identifier })
}
