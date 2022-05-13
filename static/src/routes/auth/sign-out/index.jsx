import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import propTypes from 'prop-types'

import persistentStorage from '../../../utils/persistent-storage'

import './index.scss'

const auth = persistentStorage.auth

const SignOut = () => {
  const [signedOut, setSignedOut] = useState(false)

  const onSignOut = (evt) => {
    evt.preventDefault()

    auth.clear()
    setSignedOut(true)
  }

  if (signedOut) {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Signed out</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You have been successfully signed out.</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Sign out</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to sign out?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='danger' onClick={onSignOut}>Sign out</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

SignOut.propTypes = {
  returnToPath: propTypes.string
}

export default SignOut
