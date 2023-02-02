/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/cart.css'
import Cart from './Cart'

const AppNavBar = () => {
  // Offcanvas cart
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const cartProducts = useSelector(state => state.cartProducts)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    const token = localStorage.getItem('token')
    token ? setShow(true) : navigate('/login')
  }

  const navigateAndScroll = (path) => {
    navigate(`/${path}`)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Navbar bg='dark' expand='md' variant='dark' sticky='top'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Digital Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/purcharses'>
                Purcharses
              </Nav.Link>
              <Nav.Link as={Link} to='/user'>
                <i className='bx bx-user' />
              </Nav.Link>
              <Nav.Link className='cart-icon-contaniner' onClick={handleShow}>
                <i className='bx bx-cart-alt' />{' '}
                <span className='cart-length'>{cartProducts.length}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* NAV BTN MOBILE */}
      <ButtonGroup className='nav-mobile' aria-label='Basic example'>
        <Button
          onClick={handleShow}
          className='btn-nav-mobile'
          variant='primary'
        >
          <i className='bx bx-cart-alt bx-sm' />
        </Button>
        <Button
          onClick={() => navigateAndScroll('purcharses')}
          className='btn-nav-mobile'
          variant='primary'
        >
          <i className='bx bx-box bx-sm' />
        </Button>
        <Button
          onClick={() => navigateAndScroll('login')}
          className='btn-nav-mobile btn-nav-mobile--rigth'
          variant='primary'
        >
          <i className='bx bx-user bx-sm' />
        </Button>
      </ButtonGroup>

      <Cart show={show} handleClose={handleClose} />
    </>
  )
}

export default AppNavBar
