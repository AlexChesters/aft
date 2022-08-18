require('dotenv').config()

// const setSecrets = require('./utils/set-secrets')
const config = require('./config')

async function main () {
  // await setSecrets()
  require('./app').listen(
    config.port,
    () => console.log(`[${config.environment}] aft-api running on port ${config.port}`)
  )
}

main()
