const express = require('express')

const routes = {
  search: require('./search')
}

module.exports = () => {
  const router = express.Router()

  router.get('/search/:identifier', routes.search)

  return router
}
