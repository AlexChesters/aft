import React from 'react'

import isStandaloneMode from '../../utils/is-standalone-mode'
import persistentStorage from '../../utils/persistent-storage'

import './index.scss'

const auth = persistentStorage.auth

const Help = () => {
  const mailSubject = 'aft Help'
  const mailBody = `%0D%0A%0D%0A
  ----------%0D%0A
  Version: ${process.env.VERSION}%0D%0A
  Standalone: ${isStandaloneMode}%0D%0A
  User-Agent: ${navigator.userAgent}
  `

  return (
    <section className='help--container'>
      <p>If you have any issues using the site, please contact <a href={`mailto:aft@cheste.rs?subject=${mailSubject}&body=${mailBody}`}>click here</a> to get in touch.</p>

      <p>
        Version: {process.env.VERSION} <br />
        Standalone: {`${isStandaloneMode}`} <br />
        User-agent: {navigator.userAgent} <br />
        Auth expires: {auth.get('expiresIn')}
      </p>
    </section>
  )
}

export default Help
