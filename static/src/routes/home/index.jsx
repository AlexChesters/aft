import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

import './index.scss'

const Home = () => {
  return (
    <section className='home--container'>
      <Jumbotron>
        <h1>AFT (Alex&apos;s Flight Tool)</h1>
        <p>The data on this website may be inaccurate and must only be used for flight simulation and not real world flying.</p>
      </Jumbotron>
    </section>
  )
}

export default Home
