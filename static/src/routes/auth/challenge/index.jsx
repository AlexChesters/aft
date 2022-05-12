import propTypes from 'prop-types'

import apiClient from '../../../networking/api-client'

import './index.scss'

const AuthenticationChallenge = (props) => {
  let returnTo = `${window.location.protocol + '//' + window.location.host}`

  props.returnToPath
    ? returnTo += props.returnToPath
    : returnTo += '/aft/'

  if (!returnTo.endsWith('/')) returnTo += '/'

  window.location = `${apiClient.baseURL}/login?returnTo=${encodeURIComponent(returnTo)}`

  return null
}

AuthenticationChallenge.propTypes = {
  returnToPath: propTypes.string
}

export default AuthenticationChallenge
