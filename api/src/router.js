const express = require('express')

const routes = {
  status: require('./routes/status'),
  signIn: require('./routes/sign-in')
}

const routers = {
  checklists: require('./routes/apps/checklists'),
  airports: require('./routes/apps/airports'),
  aircraft: require('./routes/apps/aircraft')
}

const middleware = {
  accessLogging: require('./middleware/access-logging'),
  returnTo: require('./middleware/return-to'),
  cacheControl: require('./middleware/cache-control'),
  version: require('./middleware/version'),
  ensureAuthenticated: require('./middleware/ensure-authenticated')
}

module.exports = (passport) => {
  const router = express.Router()

  router.use(passport.initialize())
  router.use(passport.session())
  router.use(middleware.accessLogging, middleware.version)

  router.get('/status', middleware.cacheControl.noStore, routes.status)

  // routers
  router.use(
    '/checklists',
    middleware.cacheControl.noStore,
    middleware.ensureAuthenticated,
    routers.checklists()
  )
  router.use(
    '/airports',
    middleware.cacheControl.fiveMinutes,
    routers.airports()
  )
  router.use(
    '/aircraft',
    middleware.cacheControl.fiveMinutes,
    routers.aircraft()
  )

  // authentication routes
  router.post('/sign-in', middleware.cacheControl.noStore, routes.signIn)

  // debugging routes
  router.post('/debug', middleware.cacheControl.noStore, middleware.ensureAuthenticated, (req, res) => res.sendStatus(200))

  return router
}
