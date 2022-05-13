const passport = require('passport')
const DynamoDB = require('aws-sdk/clients/dynamodb')

const config = require('../config')
const isDevelopmentEnvironment = require('../utils/is-development-environment')

const client = new DynamoDB.DocumentClient({ region: 'eu-west-1' })

module.exports = function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.redirect(`${req.baseUrl}/login`) }

    req.logIn(user, async function (err) {
      if (err) { return next(err) }

      try {
        await client.update({
          TableName: config.checklistTableName,
          Key: { UserIdentifier: req.user.userId },
          UpdateExpression: 'SET #checklists = :empty_object',
          ConditionExpression: 'attribute_not_exists(#checklists)',
          ExpressionAttributeNames: {
            '#checklists': 'Checklists'
          },
          ExpressionAttributeValues: {
            ':empty_object': {}
          }
        }).promise()
      } catch (ex) {
        if (ex.code !== 'ConditionalCheckFailedException') throw ex
      }

      const returnTo = req.session.returnTo
      delete req.session.returnTo

      res.cookie('logged_in', 'true', {
        maxAge: 365 * 24 * 60 * 60 * 1000, // one year
        domain: config.cookieDomain,
        path: '/aft/'
      })

      if (returnTo && returnTo.startsWith('aft://')) {
        res.redirect(`aft://callback?token=${req.user.accessToken}`)
        return
      }

      const defaultRedirectPath = isDevelopmentEnvironment
        ? 'http://localhost:8081/auth/success'
        : 'https://projects.alexchesters.com/aft/auth/success'

      res.redirect(returnTo || defaultRedirectPath)
    })
  })(req, res, next)
}
