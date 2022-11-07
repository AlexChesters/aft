const AuthChallenge = () => {
  window.location = process.env.NODE_ENV === 'development'
    ? 'https://dev-aft-auth.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=2jhdvpoonssab68ep43f0bjec6&response_type=code&scope=email%20openid&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcallback%2Fweb'
    : 'https://aft-auth.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=6eptqopvr36i0ujq0o2i9bbrqg&response_type=code&scope=email%20openid&redirect_uri=https%3A%2F%2Fedge.alexchesters.com%2Faft%2Fauth%2Fcallback%2Fweb'

  return null
}

export default AuthChallenge
