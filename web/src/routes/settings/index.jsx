import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import persistentStorage from '../../utils/persistent-storage'

import './index.scss'

const Settings = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const onChecklistProgressReset = (evt) => {
    evt.preventDefault()

    persistentStorage.checklistState.clear()
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
          <p>Your settings have been saved.</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }

  return (
    <section className='settings--container'>
      <h1>Settings</h1>
      <Button className='button' onClick={onChecklistProgressReset}>Reset progress of all checklists</Button>
    </section>
  )
}

export default Settings
