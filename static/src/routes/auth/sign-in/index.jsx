import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import propTypes from 'prop-types'

import apiClient from '../../../networking/api-client'
import persistentStorage from '../../../utils/persistent-storage'

import './index.scss'

const auth = persistentStorage.auth

const SignIn = (props) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  let returnTo = `${window.location.protocol + '//' + window.location.host}`

  props.returnToPath
    ? returnTo += props.returnToPath
    : returnTo += '/aft/'

  if (!returnTo.endsWith('/')) returnTo += '/'

  const onSubmit = async (evt) => {
    evt.preventDefault()

    const response = await apiClient.auth.signIn(email, password)

    const date = new Date()
    date.setSeconds(date.getSeconds() + response.data.expires_in)

    auth.set('accessToken', response.data.access_token)
    auth.set('expiresIn', date.toISOString())

    window.location = returnTo
  }

  return (
    <Form onSubmit={onSubmit} className='sign-in--container'>
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

SignIn.propTypes = {
  returnToPath: propTypes.string
}

export default SignIn
