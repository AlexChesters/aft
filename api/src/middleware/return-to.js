module.exports = (req, res, next) => {
  req.session.returnTo = req.query.returnTo
  next()
}
