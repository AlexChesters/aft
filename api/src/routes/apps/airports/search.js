const fetch = require('node-fetch')
const airportData = require('../../../data/airports.json')

module.exports = async (req, res) => {
  const result = airportData.find(({ identifier }) => identifier === req.params.identifier.toUpperCase())

  const response = await fetch(
    `https://avwx.rest/api/metar/${req.params.identifier.toUpperCase()}?options=info,summary,speech`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AVWX_TOKEN}`
      }
    }
  )

  if (response.status === 204) {
    res.json({ airportInfo: result })
    return
  }

  const metarData = await response.json()

  res.json({
    airportInfo: result,
    weather: {
      airport: metarData.info.name,
      summary: metarData.summary,
      metar: metarData.sanitized,
      speech: metarData.speech
    }
  })
}
