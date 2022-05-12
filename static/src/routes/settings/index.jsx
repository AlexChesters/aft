import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import persistentStorage from '../../utils/persistent-storage'

import './index.scss'

const Settings = (evt) => {
  const [simBriefUsername, setSimBriefUsername] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const storage = persistentStorage.settings

  useEffect(() => {
    setSimBriefUsername(storage.get('SIMBRIEF_USERNAME'))
  }, [])

  const onSubmit = (evt) => {
    evt.preventDefault()

    storage.set('SIMBRIEF_USERNAME', simBriefUsername)
    setShowSuccessModal(true)
  }

  if (showSuccessModal) {
    return (
      <Modal.Dialog>
        <Modal.Header
          closeButton
          onHide={() => setShowSuccessModal(false)}
        >
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your SimBrief username has been saved.</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }

  return (
    <section className='settings--container'>
      <Form onSubmit={onSubmit} className='home--form'>
        <Form.Group>
          <Form.Label className='home--form label label__title'>
            SimBrief username
          </Form.Label>
          <Form.Control
            as='input'
            id='form-input-simbrief-username-identifier'
            required
            autoComplete='off'
            defaultValue={simBriefUsername}
            onChange={(e) => {
              setSimBriefUsername(e.target.value)
            }}
          />
        </Form.Group>
        <Button className='button' type='submit'>Save</Button>
      </Form>
    </section>
  )
}

export default Settings
