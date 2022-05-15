const express = require('express')

const routes = {
  status: require('./routes/status'),
  callback: {
    web: require('./routes/auth/callback/web'),
    ios: require('./routes/auth/callback/ios')
  },
  refresh: {
    web: require('./routes/auth/refresh/web'),
    ios: require('./routes/auth/refresh/ios')
  }
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

module.exports = () => {
  const router = express.Router()

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
  router.get('/auth/callback/web', middleware.cacheControl.noStore, routes.callback.web)
  router.get('/auth/refresh/web', middleware.cacheControl.noStore, routes.refresh.web)
  router.get('/auth/callback/ios', middleware.cacheControl.noStore, routes.callback.ios)
  router.get('/auth/refresh/ios', middleware.cacheControl.noStore, routes.refresh.ios)

  // debugging routes
  router.get('/debug', middleware.cacheControl.noStore, middleware.ensureAuthenticated, (req, res) => res.sendStatus(200))

  return router
}
