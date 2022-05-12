import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import PageSkeleton from './components/page-skeleton'
import AuthChallenge from './routes/auth/challenge'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // for some reason eslint didn't like the intendation of this function (hence
  // the eslint-disable-line's)
  console.log('cookie', document.cookie)
  return document.cookie.includes('logged_in=true')
    ? (
      <Route {...rest} render={(props) => (
        <PageSkeleton>
          <Component {...props} />
        </PageSkeleton>
      )} />
    ) // eslint-disable-line indent
    : (
      <PageSkeleton>
        <AuthChallenge returnToPath={window.location.pathname} />
      </PageSkeleton>
    ) // eslint-disable-line indent
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute
