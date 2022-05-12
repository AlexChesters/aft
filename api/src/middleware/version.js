module.exports = (req, res, next) => {
  res.set('api-version', process.env.APP_VERSION || 'unknown')
  next()
}
