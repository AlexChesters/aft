const express = require('express')
const session = require('express-session')
const DynamoDBStore = require('connect-dynamodb')({ session: session })
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const router = require('./router')
const isDevelopmentEnvironment = require('./utils/is-development-environment')
const config = require('./config')

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    domain: config.cookieDomain,
    // one year
    maxAge: 31536000 * 1000,
    rolling: true
  },
  name: 'aft.auth',
  store: !isDevelopmentEnvironment && new DynamoDBStore({
    AWSRegion: 'eu-west-1',
    table: config.sessionTableName,
    hashKey: 'Identifier'
  }),
  resave: false,
  saveUninitialized: true
}

const app = express()

const strategy = new Auth0Strategy(
  {
    domain: config.auth0.domain,
    clientID: config.auth0.clientId,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: config.callbackURL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    done(null, {
      accessToken: accessToken,
      displayName: profile.displayName,
      userId: profile.user_id,
      emailAddress: profile.emails[0] && profile.emails[0].value
    })
  }
)
passport.use(strategy)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

app.use(bodyParser.json())
app.use(session(sess))
app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://192.168.1.125:8081',
    'https://projects.alexchesters.com'
  ],
  allowedHeaders: [
    'access-control-allow-credentials',
    'authorization',
    'cookie',
    'content-type'
  ],
  exposedHeaders: ['set-cookie'],
  credentials: true
}))

isDevelopmentEnvironment
  ? app.use(router(passport))
  : app.use('/aft', router(passport))

module.exports = app
