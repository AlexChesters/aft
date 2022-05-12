const express = require('express')

const routes = {
  search: require('./search')
}

module.exports = (middleware) => {
  const router = express.Router()

  router.get(
    '/search/:identifier',
    middleware.cacheControl.oneDay,
    routes.search
  )

  return router
}
