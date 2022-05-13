import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import propTypes from 'prop-types'

import apiClient from '../../../networking/api-client'

import './index.scss'

const AuthenticationChallenge = (props) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const onSubmit = async (evt) => {
    evt.preventDefault()

    const response = await apiClient.auth.signIn(email, password)
    console.log('sign in response', response)
  }

  return (
    <Form onSubmit={onSubmit} className='auth-challenge--container'>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

AuthenticationChallenge.propTypes = {
  returnToPath: propTypes.string
}

export default AuthenticationChallenge
