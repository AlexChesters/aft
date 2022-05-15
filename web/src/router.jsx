import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './styles/index.scss'

import PageSkeleton from './components/page-skeleton'
import ProtectedRoute from './protected-route'
import AuthSuccess from './routes/auth/success'
import Home from './routes/home'
import Help from './routes/help'

import Airports from './routes/apps/airports'
import Checklists from './routes/apps/checklists'
import CalculatorsConvertersAndGenerators from './routes/apps/calculators-converters-and-generators'

export default function router () {
  return (
    <Router basename={'/aft'}>
      <Switch>
        <Route exact path='/auth/challenge' render={(props) => {
          return (
            <PageSkeleton>
              <h1>Challenge</h1>
            </PageSkeleton>
          )
        }} />
        <Route exact path='/auth/success' component={AuthSuccess} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/help' component={Help} />
        <ProtectedRoute path='/airports' component={Airports} />
        <ProtectedRoute path='/checklists' component={Checklists} />
        <ProtectedRoute path='/calculators-converters-and-generators' component={CalculatorsConvertersAndGenerators} />
      </Switch>
    </Router>
  )
}
