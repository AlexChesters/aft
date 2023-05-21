require('dotenv').config()

const setSecrets = require('./utils/set-secrets')
const config = require('./config')
const log = require('./utils/log')

async function main () {
  await setSecrets()
  require('./app').listen(
    config.port,
    () => log(`[${config.environment}] aft-api running on port ${config.port}`)
  )
}

main()
