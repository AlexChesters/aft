const isDevelopmentEnvironment = require('./utils/is-development-environment')

const cookieDomain = {
  development: 'localhost',
  'development-shared': '192.168.1.125',
  production: 'alexchesters.com'
}[process.env.NODE_ENV]

const callbackURL = {
  development: 'http://localhost:8080/callback',
  'development-shared': 'http://192.168.1.125:8080/callback',
  production: 'https://edge.alexchesters.com/aft/callback',
  test: 'http://noop'
}[process.env.NODE_ENV]

module.exports = {
  cookieDomain: cookieDomain,
  sessionTableName: isDevelopmentEnvironment
    ? 'aft-test-session-table'
    : 'aft-live-session-table',
  checklistTableName: isDevelopmentEnvironment
    ? 'aft-test-table'
    : 'aft-live-table',
  auth0: {
    domain: 'aircraft-checklist.eu.auth0.com',
    clientId: isDevelopmentEnvironment
      ? 'eurAmb5r1Hss224GxbvMfIGM2NvHcHCQ'
      : 'A0z50h51rjmaKX0Lecz6VC0XPWlOwe0k'
  },
  cognito: {
    domain: isDevelopmentEnvironment
      ? 'https://dev-aft.auth.eu-west-1.amazoncognito.com'
      : 'https://aft.auth.eu-west-1.amazoncognito.com',
    ios: {
      clientId: isDevelopmentEnvironment
        ? '1gmnp8tt6jtg9s3k8plopfnkt5'
        : '2bkinc2fc0amh3qkvqgvlh0epd',
      redirectUri: isDevelopmentEnvironment
        ? 'http://localhost:8080/auth/callback/ios'
        : 'https://edge.alexchesters.com/aft/auth/callback/ios',
      destinationUri: 'aft://auth/success'
    },
    web: {
      clientId: isDevelopmentEnvironment
        ? '6l4rtjsnsuf5sg1ejth9r8lsh3'
        : '4h37tr4pcqmmk891lbqg2p7de2',
      redirectUri: isDevelopmentEnvironment
        ? 'http://localhost:8080/auth/callback/web'
        : 'https://edge.alexchesters.com/aft/auth/callback/ios',
      destinationUri: isDevelopmentEnvironment
        ? 'http://localhost:8081/auth/success'
        : 'https://projects.alexchesters.com/aft/auth/success'
    }
  },
  callbackURL: callbackURL,
  environment: isDevelopmentEnvironment ? 'DEV' : 'PROD',
  port: isDevelopmentEnvironment ? 8080 : 80
}
