import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import PageSkeleton from './components/page-skeleton'
import SignIn from './routes/auth/sign-in'
import persistentStorage from './utils/persistent-storage'

const auth = persistentStorage.auth

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let authenticated = false

  const token = auth.get('accessToken')
  const expires = new Date(auth.get('expiresIn'))

  // consider tokens due to expire within 1 hour as expired
  expires.setHours(expires.getHours() - 1)

  if (token && (new Date() <= expires)) {
    authenticated = true
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
        <SignIn returnToPath={window.location.pathname} />
      </PageSkeleton>
    ) // eslint-disable-line indent
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute
