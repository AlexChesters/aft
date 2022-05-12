const DynamoDB = require('aws-sdk/clients/dynamodb')

const config = require('../config')

module.exports = {
  list: async (user) => {
    const client = new DynamoDB.DocumentClient({ region: 'eu-west-1' })

    const results = await client.query({
      TableName: config.checklistTableName,
      KeyConditionExpression: 'UserIdentifier = :userId',
      ExpressionAttributeValues: {
        ':userId': user.userId
      }
    }).promise()

    const items = results.Items[0]
    const checklists = items ? items.Checklists : {}

    return Object.keys(checklists).map((identifier) => ({
      identifier,
      ...checklists[identifier]
    }))
  }
}
