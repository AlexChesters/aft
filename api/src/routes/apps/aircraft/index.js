const express = require('express')

const routes = {
  list: require('./list')
}

module.exports = (middleware) => {
  const router = express.Router()

  router.get(
    '/list',
    middleware.cacheControl.fiveMinutes,
    routes.list
  )

  return router
}
