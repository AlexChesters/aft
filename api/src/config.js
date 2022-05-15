const isDevelopmentEnvironment = require('./utils/is-development-environment')

module.exports = {
  sessionTableName: isDevelopmentEnvironment
    ? 'aft-test-session-table'
    : 'aft-live-session-table',
  checklistTableName: isDevelopmentEnvironment
    ? 'aft-test-table'
    : 'aft-live-table',
  cognito: {
    userPoolId: isDevelopmentEnvironment
      ? 'eu-west-1_J73UIaGgA'
      : 'eu-west-1_JtBnXlkNb',
    domain: isDevelopmentEnvironment
      ? 'https://dev-aft.auth.eu-west-1.amazoncognito.com'
      : 'https://aft.auth.eu-west-1.amazoncognito.com',
    ios: {
      clientId: isDevelopmentEnvironment
        ? '1gmnp8tt6jtg9s3k8plopfnkt5'
        : '7i2fmh23s0j3u5nrb29v1qp9qd',
      redirectUri: isDevelopmentEnvironment
        ? 'http://localhost:8080/auth/callback/ios'
        : 'https://edge.alexchesters.com/aft/auth/callback/ios',
      destinationUri: 'aft://auth/success'
    },
    web: {
      clientId: isDevelopmentEnvironment
        ? '6l4rtjsnsuf5sg1ejth9r8lsh3'
        : '587nslla7ek69ap9qk6allch38',
      redirectUri: isDevelopmentEnvironment
        ? 'http://localhost:8080/auth/callback/web'
        : 'https://edge.alexchesters.com/aft/auth/callback/web',
      destinationUri: isDevelopmentEnvironment
        ? 'http://localhost:8081/auth/success'
        : 'https://projects.alexchesters.com/aft/auth/success'
    }
  },
  environment: isDevelopmentEnvironment ? 'DEV' : 'PROD',
  port: isDevelopmentEnvironment ? 8080 : 80
}
