module.exports = async (req, res, next) => {
  const { code } = req.query

  if (!code) {
    res.sendStatus(400)
    return
  }

  console.log(req.query)
  res.sendStatus(200)
}
