const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = require('./router')
const isDevelopmentEnvironment = require('./utils/is-development-environment')

const app = express()

app.use(bodyParser.json())
app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://192.168.1.125:8081',
    'https://projects.alexchesters.com'
  ],
  allowedHeaders: [
    'authorization',
    'content-type'
  ],
  methods: ['GET', 'POST']
}))

isDevelopmentEnvironment
  ? app.use(router())
  : app.use('/aft', router())

module.exports = app
