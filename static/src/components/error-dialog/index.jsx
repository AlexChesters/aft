import React from 'react'
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

import './index.scss'

const ErrorDialog = (props) => {
  return (
    <section className='error'>
      <Alert variant='danger'>
        <p>Something went wrong</p>
        {props.children}
        <p>
          If this persists, please contact <a href='mailto:checklists@cheste.rs'>checklists@cheste.rs</a>.
        </p>
      </Alert>
    </section>
  )
}

ErrorDialog.propTypes = {
  children: PropTypes.node
}

export default ErrorDialog
