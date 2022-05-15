import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import PageSkeleton from './components/page-skeleton'
import Challenge from './routes/auth/challenge'
import persistentStorage from './utils/persistent-storage'

const auth = persistentStorage.auth

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // for some reason eslint didn't like the intendation of this function (hence
  // the eslint-disable-line's)
  return auth.get('accessToken')
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
