import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import propTypes from 'prop-types'

import apiClient from '../../../networking/api-client'
import persistentStorage from '../../../utils/persistent-storage'

import ErrorDialog from '../../../components/error-dialog'

import './index.scss'

const auth = persistentStorage.auth

const SignIn = (props) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)
  const [errored, setErrored] = useState(false)

  let returnTo = `${window.location.protocol + '//' + window.location.host}`

  props.returnToPath
    ? returnTo += props.returnToPath
    : returnTo += '/aft/'

  if (!returnTo.endsWith('/')) returnTo += '/'

  const onRegister = async (evt) => {
    evt.preventDefault()

    if (!email || !password) {
      return
    }

    const registerResponse = await apiClient.auth.register(email, password)

    if (registerResponse.status !== 201) {
      setErrored(true)
      return
    }

    const signInResponse = await apiClient.auth.signIn(email, password)

    if (signInResponse.status !== 200) {
      setErrored(true)
      return
    }

    const date = new Date()
    date.setSeconds(date.getSeconds() + signInResponse.data.expires_in)

    auth.set('accessToken', signInResponse.data.access_token)
    auth.set('expiresIn', date.toISOString())

    setRegistrationSuccessful(true)
  }

  const onSignIn = async (evt) => {
    evt.preventDefault()

    if (!email || !password) {
      return
    }

    const response = await apiClient.auth.signIn(email, password)

    if (response.status !== 200) {
      setErrored(true)
      return
    }

    const date = new Date()
    date.setSeconds(date.getSeconds() + response.data.expires_in)

    auth.set('accessToken', response.data.access_token)
    auth.set('expiresIn', date.toISOString())

    window.location = returnTo
  }

  if (errored) {
    return <ErrorDialog />
  }

  if (registrationSuccessful) {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Registration successful</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Welcome, {email} - you have successfully registered.</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }

  return (
    <Form className='sign-in--container'>
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
      <Button variant='primary' type='submit' onClick={onRegister}>
        Register
      </Button>
      <Button variant='primary' type='submit' onClick={onSignIn}>
        Sign in
      </Button>
    </Form>
  )
}

SignIn.propTypes = {
  returnToPath: propTypes.string
}

export default SignIn
