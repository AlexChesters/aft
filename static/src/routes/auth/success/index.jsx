import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './index.scss'

const AuthSuccess = () => {
  return (
    <section className='auth-success--container'>
      <Alert show={true} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>
          You have been authenticated, please close this window to return to the app.
        </p>
      </Alert>
    </section>
  )
}

export default AuthSuccess
