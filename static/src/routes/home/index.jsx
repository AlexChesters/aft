import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

import './index.scss'

const Home = () => {
  return (
    <section className='home--container'>
      <Jumbotron>
        <h1>AFT (Alex&apos;s Flight Tool)</h1>
      </Jumbotron>
    </section>
  )
}

export default Home
