const express = require('express')

const routes = {
  delete: require('./delete'),
  duplicate: require('./duplicate'),
  get: require('./get'),
  list: require('./list'),
  update: require('./update')
}

module.exports = () => {
  const router = express.Router()

  router.post('/update', routes.update)
  router.get('/list', routes.list)
  router.get('/get/:identifier', routes.get)
  router.post('/duplicate', routes.duplicate)
  router.post('/delete', routes.delete)

  return router
}
