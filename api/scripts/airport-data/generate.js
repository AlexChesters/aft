const fs = require('fs')
const path = require('path')

const parse = require('csv-parse/lib/sync')

const frequenciesData = parse(
  fs.readFileSync(path.join(__dirname, 'airport-frequencies.csv'), 'utf-8')
)
const airportsData = parse(
  fs.readFileSync(path.join(__dirname, 'airports.csv'), 'utf-8')
)
const runwaysData = parse(
  fs.readFileSync(path.join(__dirname, 'runways.csv'), 'utf-8')
)

frequenciesData.shift()
airportsData.shift()
runwaysData.shift()

const allFrequencies = frequenciesData.map((item) => {
  const [
    id,
    ,
    identifier,
    type,
    description,
    frequency
  ] = item

  // Mapping of frequency types to friendly frequency type names
  // this list is not exhaustive
  const types = {
    UNIC: 'UNICOM',
    APP: 'Approach',
    GND: 'Ground',
    TWR: 'Tower',
    'A/D': 'Approach/departure',
    CNTR: 'Center',
    CLD: 'Clearance Delivery',
    DIR: 'Director',
    RAD: 'Radar'
  }

  return {
    id,
    identifier,
    type: types[type] || type,
    description,
    // frequencies that end with .00 don't have the .00 included, so we add it
    // ourselves
    frequency: frequency.includes('.') ? frequency : `${frequency}.00`
  }
})

const allRunways = runwaysData.map((item) => {
  const [
    id,
    ,
    airportIdentifier,
    length,
    width,
    surface,
    lighted,
    closed,
    leIdent,
    ,
    ,
    ,
    ,
    leDisplacedThreshold,
    heIdent,
    ,
    ,
    ,
    ,
    heDisplacedThreshold
  ] = item

  // Mapping of surface identifiers to friendly surface names
  // this list is not exhaustive
  const surfaces = {
    'ASPH-G': 'Asphalt/gravel',
    ASPH: 'Asphalt',
    ASP: 'Asphalt',
    CON: 'Concrete',
    CONC: 'Concrete',
    DIRT: 'Dirt',
    GRASS: 'Grass',
    GRAVEL: 'Gravel',
    TURF: 'Turf',
    WATER: 'Water'
  }

  return {
    id,
    airportIdentifier,
    length,
    width,
    surface: surfaces[surface] || surface,
    lighted,
    closed,
    leIdent,
    leDisplacedThreshold,
    heIdent,
    heDisplacedThreshold
  }
})

const airports = airportsData.map((item) => {
  const [
    id,
    identifier,
    type,
    name,
    latitude,
    longitude,
    elevation,
    continent,
    country,
    region,
    municipality,
    scheduledService,
    gpsCode,
    iataCode,
    localCode
  ] = item

  const airportFrequencies = allFrequencies.filter((frequency) => {
    return frequency.identifier === identifier
  })

  const airportRunways = allRunways.filter((runway) => {
    return runway.airportIdentifier === identifier
  })

  return {
    id,
    identifier,
    type,
    name,
    latitude,
    longitude,
    elevation,
    continent,
    country,
    region,
    municipality,
    scheduledService,
    gpsCode,
    iataCode,
    localCode,
    frequencies: airportFrequencies,
    runways: airportRunways
  }
})

fs.writeFileSync(
  path.join(__dirname, '../../', 'src/routes/apps/airport-info/data/airports.json'),
  JSON.stringify(airports),
  'utf8'
)
