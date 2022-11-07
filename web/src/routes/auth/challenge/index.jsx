const AuthChallenge = () => {
  window.location = process.env.NODE_ENV === 'development'
    ? 'https://dev-aft-auth.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=6l4rtjsnsuf5sg1ejth9r8lsh3&response_type=code&scope=email%20openid&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcallback%2Fweb'
    : 'https://aft-auth.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=587nslla7ek69ap9qk6allch38&response_type=code&scope=email%20openid&redirect_uri=https%3A%2F%2Fedge.alexchesters.com%2Faft%2Fauth%2Fcallback%2Fweb'

  return null
}

export default AuthChallenge
