import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

import './index.scss'

const LoadingSpinner = (props) => {
  return (
    <section className='loading-spinner'>
      <CircleLoader
        size={150}
        loading={true}
      />
    </section>
  )
}

export default LoadingSpinner
