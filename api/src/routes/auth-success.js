module.exports = (req, res) => {
  return req.user
    ? res.json(req.user)
    : res.status(401).json({})
}
