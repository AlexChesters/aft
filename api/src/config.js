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
      ? 'eu-west-1_OECQQsg5K'
      : 'eu-west-1_4504R6kvy',
    domain: isDevelopmentEnvironment
      ? 'https://dev-aft-auth.auth.eu-west-1.amazoncognito.com'
      : 'https://aft-auth.auth.eu-west-1.amazoncognito.com',
    ios: {
      clientId: isDevelopmentEnvironment
        ? '2gqa0hdm4mjn577bvfpu9dbu7e'
        : '1etbhkf6c1o9o81f4c2tgs5cks',
      redirectUri: isDevelopmentEnvironment
        ? 'http://localhost:8080/auth/callback/ios'
        : 'https://edge.alexchesters.com/aft/auth/callback/ios',
      destinationUri: 'aft://auth/success'
    },
    web: {
      clientId: isDevelopmentEnvironment
        ? '2jhdvpoonssab68ep43f0bjec6'
        : '6eptqopvr36i0ujq0o2i9bbrqg',
      redirectUri: isDevelopmentEnvironment
        ? 'http://localhost:8080/auth/callback/web'
        : 'https://edge.alexchesters.com/aft/auth/callback/web',
      destinationUri: isDevelopmentEnvironment
        ? 'http://localhost:8081/auth/success'
        : 'https://projects.alexchesters.com/aft/auth/success'
    }
  },
  environment: isDevelopmentEnvironment ? 'DEV' : 'PROD',
  port: 8080
}
