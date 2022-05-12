const express = require('express')

const routes = {
  delete: require('./delete'),
  duplicate: require('./duplicate'),
  get: require('./get'),
  list: require('./list'),
  update: require('./update')
}

module.exports = (middleware) => {
  const router = express.Router()

  router.post('/update', middleware.cacheControl.noStore, routes.update)
  router.get('/list', middleware.cacheControl.noStore, routes.list)
  router.get('/get/:identifier', middleware.cacheControl.noStore, routes.get)
  router.post('/duplicate', middleware.cacheControl.noStore, routes.duplicate)
  router.post('/delete', middleware.cacheControl.noStore, routes.delete)

  return router
}
