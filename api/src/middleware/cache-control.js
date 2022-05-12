module.exports = {
  noStore: (req, res, next) => {
    res.set('cache-control', 'no-store, max-age=0')
    next()
  },
  oneDay: (req, res, next) => {
    res.set('cache-control', 'public, max-age=86400')
    next()
  },
  fiveMinutes: (req, res, next) => {
    res.set('cache-control', 'public, max-age=300')
    next()
  }
}
