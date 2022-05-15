import persistentStorage from '../../../utils/persistent-storage'

const auth = persistentStorage.auth

const AuthSuccess = () => {
  const url = new window.URL(window.location)

  const accessToken = url.searchParams.get('access_token')
  const refreshToken = url.searchParams.get('refresh_token')
  const expiresIn = url.searchParams.get('expires_in')

  const date = new Date()
  date.setSeconds(date.getSeconds() + expiresIn)

  auth.set('accessToken', accessToken)
  auth.set('refreshToken', refreshToken)
  auth.set('expiresIn', date.toISOString())
}

export default AuthSuccess
