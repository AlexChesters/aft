import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './index.scss'

const Home = () => {
  const history = useHistory()
  const [icaoIdentifier, setIcaoIdentifier] = useState(null)

  const onSubmit = async (evt) => {
    evt.preventDefault()

    if (!icaoIdentifier || icaoIdentifier.length !== 4) return

    history.push(`/airports/${icaoIdentifier}`)
  }

  return (
    <section className='home--form-container'>
      <Form onSubmit={onSubmit} className='home--form'>
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            ICAO identifier code
          </Form.Label>
          <Form.Control
            as='input'
            placeholder='EGCC'
            id='form-input-icao-identifier'
            required
            autoComplete='off'
            minLength={4}
            maxLength={4}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              setIcaoIdentifier(e.target.value)
            }}
          />
        </Form.Group>
        <Button className='button' type='submit'>Search</Button>
      </Form>
    </section>
  )
}

export default Home
