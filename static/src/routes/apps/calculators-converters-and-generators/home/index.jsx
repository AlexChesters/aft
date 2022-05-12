import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Divider from '../../../../components/divider'

import './index.scss'

const generateRandomSquawkCode = () => {
  const emergencySquawkCodes = [7500, 7600, 7700]
  const psuedoRandomNumber = (Math.floor(Math.random() * 90000000) + 10000000).toString(8).slice(0, 4)

  while (emergencySquawkCodes.includes(psuedoRandomNumber)) {
    generateRandomSquawkCode()
  }

  return psuedoRandomNumber
}

const Home = () => {
  const [randomSquawkCode, setRandomSquawkCode] = useState(null)
  const [hpa, setHpa] = useState(null)
  const [hg, setHg] = useState(null)
  const [airfieldAltitude, setAirfieldAltitude] = useState(null)
  const [qnh, setQnh] = useState(null)
  const [qfe, setQfe] = useState(null)
  const [kilograms, setKilograms] = useState(null)
  const [pounds, setPounds] = useState(null)
  const [cruisingAltitude, setCruisingAltitude] = useState(null)
  const [meters, setMeters] = useState(null)
  const [feet, setFeet] = useState(null)
  const [celcius, setCelcius] = useState(null)
  const [fahrenheit, setFahrenheit] = useState(null)

  useEffect(() => {
    if (!randomSquawkCode) return

    document.getElementById('form-input-squawk-identifier').value = randomSquawkCode
  }, [randomSquawkCode])

  useEffect(() => {
    if (!hpa) return
    document.getElementById('form-input-hg-identifier').value = (hpa / 33.863886666667).toFixed(2)
  }, [hpa])

  useEffect(() => {
    if (!hg) return
    document.getElementById('form-input-hpa-identifier').value = Number.parseInt(hg * 33.863886666667).toString().slice(0, 4)
  }, [hg])

  useEffect(() => {
    if (!qnh) return

    const millibarsAboveMSL = airfieldAltitude / 30
    document.getElementById('form-input-qfe-identifier').value = Number.parseInt(Number.parseInt(qnh) - millibarsAboveMSL)
  }, [qnh])

  useEffect(() => {
    if (!qfe) return

    const millibarsAboveMSL = airfieldAltitude / 30
    document.getElementById('form-input-qnh-identifier').value = Number.parseInt(Number.parseInt(qfe) + millibarsAboveMSL)
  }, [qfe])

  useEffect(() => {
    if (!kilograms) return
    document.getElementById('form-input-pounds-identifier').value = Number.parseInt(kilograms / 0.45359237)
  }, [kilograms])

  useEffect(() => {
    if (!pounds) return
    document.getElementById('form-input-kilograms-identifier').value = Number.parseInt(pounds * 0.45359237)
  }, [pounds])

  useEffect(() => {
    if (!cruisingAltitude) return

    document.getElementById('form-input-descent-30per10plus10-identifier').value = Math.round(((cruisingAltitude / 10000) * 30) + 10)
    document.getElementById('form-input-descent-40per10plus15-identifier').value = Math.round(((cruisingAltitude / 10000) * 40) + 15)
  }, [cruisingAltitude])

  useEffect(() => {
    if (!meters) return
    document.getElementById('form-input-feet-identifier').value = Number.parseInt(meters * 3.28084)
  }, [meters])

  useEffect(() => {
    if (!feet) return
    document.getElementById('form-input-meters-identifier').value = Number.parseInt(feet / 3.28084)
  }, [feet])

  useEffect(() => {
    if (!celcius) return
    document.getElementById('form-input-fahrenheit-identifier').value = (celcius * (9 / 5)) + 32
  }, [celcius])

  useEffect(() => {
    if (!fahrenheit) return
    document.getElementById('form-input-celcius-identifier').value = ((fahrenheit - 32) * (5 / 9)).toFixed(2)
  }, [fahrenheit])

  useEffect(() => {
    setRandomSquawkCode(generateRandomSquawkCode())
  }, [])

  return (
    <section className='home--form-container'>
      <Form className='home--form'>
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Squawk code
          </Form.Label>
          <Form.Control
            as='input'
            id='form-input-squawk-identifier'
            required
            autoComplete='off'
            readOnly={true}
          />
          <Button
            onClick={() => {
              setRandomSquawkCode(generateRandomSquawkCode())
            }}
          >Generate</Button>
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Hectopascal (hPa)
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='1013'
            id='form-input-hpa-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setHpa(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            Inches of mercury (Hg)
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='2992'
            id='form-input-hg-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setHg(e.target.value)
            }}
          />
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Airfield Altitude (feet)
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='200'
            id='form-input-airfield-altitude-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              setAirfieldAltitude(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            QNH (hPa)
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='1030'
            id='form-input-qnh-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              setQnh(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            QFE (hPa)
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='1023'
            id='form-input-qfe-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              setQfe(e.target.value)
            }}
          />
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Kilograms
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='5000'
            id='form-input-kilograms-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setKilograms(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            Pounds
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='11023'
            id='form-input-pounds-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setPounds(e.target.value)
            }}
          />
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Cruising altitude
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='32000'
            id='form-input-cruising-altitude-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              setCruisingAltitude(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            Descent range (30 per 10 plus 10)
          </Form.Label>
          <Form.Control
            as='input'
            id='form-input-descent-30per10plus10-identifier'
            required
            autoComplete='off'
            readOnly={true}
          />
          <Form.Label className='home--form label label__title'>
            Descent range (40 per 10 plus 15)
          </Form.Label>
          <Form.Control
            as='input'
            id='form-input-descent-40per10plus15-identifier'
            required
            autoComplete='off'
            readOnly={true}
          />
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Meters
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='5000'
            id='form-input-meters-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setMeters(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            Feet
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='3000'
            id='form-input-feet-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setFeet(e.target.value)
            }}
          />
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            Celcius
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='26'
            id='form-input-celcius-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setCelcius(e.target.value)
            }}
          />
          <Form.Label className='home--form label label__title'>
            Fahrenheit
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='68'
            id='form-input-fahrenheit-identifier'
            required
            autoComplete='off'
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setFahrenheit(e.target.value)
            }}
          />
        </Form.Group>
      </Form>
    </section>
  )
}

export default Home
