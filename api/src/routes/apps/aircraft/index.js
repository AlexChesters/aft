const express = require('express')

const routes = {
  list: require('./list')
}

module.exports = () => {
  const router = express.Router()

  router.get('/list', routes.list)

  return router
}
