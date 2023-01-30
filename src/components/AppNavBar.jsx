import React, { useState } from 'react';
import { Button, ButtonGroup, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/cart.css'

const AppNavBar = () => {
    //Offcanvas cart
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(1)
    const navigate = useNavigate()
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigateAndScroll = (path) =>{
      navigate(`/${path}`)
      window.scrollTo(0, 0)
    }


    return (
      <>
        <Navbar bg="dark" expand="md" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Digital Store
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/purcharses">
                  Purcharses
                </Nav.Link>
                <Nav.Link onClick={handleShow}>Cart</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* OffCanvas CART */}

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="canvas-cart-container">
            <div className="cart-card">
              <div className="cart-product">
                <img
                  className="cart-img"
                  src="https://e-commerce-api-v2.academlo.tech/uploads/b.jpg"
                />
                <div className="cart-detail">
                  <p>Samsung Galaxy S22</p>
                  <div className="btn-container btn-container--cart">
                    <button
                      onClick={() =>
                        setCounter(counter > 0 ? counter - 1 : counter)
                      }
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter">{counter}</span>
                    <button
                      onClick={() => setCounter(counter + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                    <button className="btn-delete">
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
              </div>

              <p className="cart-total">
                Total: <span className="special-color">$500</span>
              </p>
            </div>

            <div className="cart-checkout">
              <hr />
              <p className="cart-total cart-total--check">
                Total: <span className="special-color">$500</span>
              </p>
              <button className="btn-checkout">Check Out</button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* NAV BTN MOBILE */}
        <ButtonGroup className='nav-mobile' aria-label="Basic example">
          <Button onClick={handleShow} className='btn-nav-mobile' variant="primary"><i className='bx bx-cart-alt bx-sm' ></i></Button>
          <Button onClick={() => navigateAndScroll("purcharses") } className='btn-nav-mobile' variant="primary"><i className='bx bx-box bx-sm' ></i></Button>
          <Button onClick={() => navigateAndScroll("login")} className='btn-nav-mobile btn-nav-mobile--rigth' variant="primary"><i className='bx bx-user bx-sm' ></i></Button>
        </ButtonGroup>
      </>
    );
};

export default AppNavBar;

