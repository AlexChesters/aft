const checklists = require('../../../utils/checklists')

module.exports = async (req, res) => {
  if (!req.user) return res.status(401).json({})

  res.json(await checklists.list(req.user))
}
