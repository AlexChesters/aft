import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import PropTypes from 'prop-types'

import isStandaloneMode from '../../utils/is-standalone-mode'

import './index.scss'

const Skeleton = (props) => {
  const history = useHistory()

  const basePath = '/aft'

  return (
    <div className='skeleton'>
      <Navbar bg='dark' expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='aft--navbar-toggler' />
        <Navbar.Collapse id='basic-navbar-nav' className='aft--navbar'>
          <Nav>
            <Navbar.Brand href={`${basePath}/`}>
              <img
                src={`${basePath}/img/icon.png`}
                className='d-inline-block align-top navbar--brand'
              />
            </Navbar.Brand>
            <Nav.Link className='navbar--item' href={`${basePath}/checklists`}>Checklists</Nav.Link>
            <Nav.Link className='navbar--item' href={`${basePath}/airports`}>Airports</Nav.Link>
            <Nav.Link className='navbar--item' href={`${basePath}/calculators-converters-and-generators`}>Calculators, converters &amp; generators</Nav.Link>
          </Nav>
          <NavDropdown.Divider />
          {
            // fix lack of right-aligned navbar
            // https://stackoverflow.com/a/22429853
          }
          <Nav className='navbar--right-align'>
            {
              // actual browsers have back buttons, but standalone modes (e.g.
              // PWAs) don't, so we show those devices a button in the navbar
              isStandaloneMode && (
                <Nav.Link
                  className='navbar--item'
                  onClick={() => { history.goBack() }}
                >
                  Back
                </Nav.Link>
              )
            }
            <Nav.Link
              className='navbar--item'
              href={`${basePath}/help`}
            >
              Help
            </Nav.Link>
            <Nav.Link
              className='navbar--item'
              href={`${basePath}/settings`}
            >
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        {props.children}
      </main>
    </div>
  )
}

Skeleton.propTypes = {
  children: PropTypes.node
}

export default Skeleton
