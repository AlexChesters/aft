const express = require('express')

const routes = {
  callback: require('./routes/callback'),
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
  authenticate: require('./middleware/authenticate'),
  cacheControl: require('./middleware/cache-control'),
  version: require('./middleware/version')
}

module.exports = (passport) => {
  const router = express.Router()

  router.use(passport.initialize())
  router.use(passport.session())
  router.use(middleware.accessLogging, middleware.version)

  router.get('/status', middleware.cacheControl.noStore, routes.status)

  // routers
  router.use('/checklists', routers.checklists(middleware))
  router.use('/airports', middleware.cacheControl.fiveMinutes, routers.airports(middleware))
  router.use('/aircraft', middleware.cacheControl.fiveMinutes, routers.aircraft(middleware))

  // authentication routes
  router.get('/login', middleware.cacheControl.noStore, middleware.returnTo, middleware.authenticate)
  router.get('/callback', middleware.cacheControl.noStore, routes.callback)
  router.post('/sign-in', middleware.cacheControl.noStore, routes.signIn)

  return router
}
