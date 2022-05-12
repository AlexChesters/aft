const DynamoDB = require('aws-sdk/clients/dynamodb')
const { v4: uuidv4 } = require('uuid')

const config = require('../../../config')

const client = new DynamoDB.DocumentClient({ region: 'eu-west-1' })

module.exports = async (req, res) => {
  if (!req.user) return res.status(401).json({})

  const identifier = req.body.identifier || uuidv4()

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
      ':new_checklist': { ...req.body.checklist, identifier }
    }
  }).promise()

  res.status(201).json({ identifier })
}
