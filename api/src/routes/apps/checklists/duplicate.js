const DynamoDB = require('aws-sdk/clients/dynamodb')
const { v4: uuidv4 } = require('uuid')

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

  const checklist = results.Items[0].Checklists[req.body.identifier]

  const identifier = uuidv4()

  await client.update({
    TableName: config.checklistTableName,
    Key: { UserIdentifier: req.user.userId },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #checklists.#checklist_identifier = :new_checklist',
    ExpressionAttributeNames: {
      '#checklists': 'Checklists',
      '#checklist_identifier': identifier
    },
    ExpressionAttributeValues: {
      ':new_checklist': { ...checklist, identifier }
    }
  }).promise()

  res.status(201).json({ identifier })
}
