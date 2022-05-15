import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import PageSkeleton from './components/page-skeleton'
import Challenge from './routes/auth/challenge'
import persistentStorage from './utils/persistent-storage'

const auth = persistentStorage.auth

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let authenticated = false

  const token = auth.get('accessToken')
  const expires = new Date(auth.get('expiresIn'))

  // consider tokens due to expire within 30 minutes as expired
  expires.setMinutes(expires.setMinutes() - 30)

  if (token) {
    if (new Date() <= expires) {
      authenticated = true
    } else {
      console.log('expired token')
    }
  }

  // for some reason eslint didn't like the intendation of this function (hence
  // the eslint-disable-line's)
  return authenticated
    ? (
      <Route {...rest} render={(props) => (
        <PageSkeleton>
          <Component {...props} />
        </PageSkeleton>
      )} />
    ) // eslint-disable-line indent
    : (
      <PageSkeleton>
        <Challenge />
      </PageSkeleton>
    ) // eslint-disable-line indent
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute
