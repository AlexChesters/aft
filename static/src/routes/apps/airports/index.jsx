import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Home from './home'
import Detail from './detail'

const Router = (props) => {
  return (
    <div>
      <Route exact path={`${props.match.path}/`} component={Home} />
      <Route path={`${props.match.path}/:identifier`} component={Detail} />
    </div>
  )
}

Router.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
}

export default Router
