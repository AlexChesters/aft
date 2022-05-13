import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import List from './list'
import Create from './create'
import View from './view'
import Edit from './edit'

const Router = (props) => {
  return (
    <div>
      <Route exact path={`${props.match.path}`} component={List} />
      <Route path={`${props.match.path}/create`} component={Create} />
      <Route path={`${props.match.path}/view/:identifier`} component={View} />
      <Route path={`${props.match.path}/edit/:identifier`} component={Edit} />
      <Route path={`${props.match.path}/help`} component={List} />
    </div>
  )
}

Router.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
}

export default Router
