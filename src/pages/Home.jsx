/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Offcanvas, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk, searchProductsThunk } from '../store/slices/products.slice'
import { useNavigate } from 'react-router-dom'
import AppFilter from '../components/AppFilter'
import { addProductToCartThunk, getCartThunk } from '../store/slices/cartProducts.slice'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Despachar los productos del carrito desde home, para que cuando el usuario se logee se vean los productos del carrito
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getCartThunk())
    }
    dispatch(getProductsThunk())
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addProduct = (id) => {
    const product = {
      quantity: 1,
      productId: id
    }
    dispatch(addProductToCartThunk(product))
  }

  // console.log(products);

  return (
    <Container fluid className='container-style'>
      <Row>
        {/* COLUMNA IZQUIERDA DE FILTROS */}
        <Col className='acordion-filter' lg={4} xl={3} xxl={2}>
          <AppFilter />
        </Col>

        {/* COLUMNA DERECHA DE PRODUCTOS */}
        <Col>
          {/* SEARCH */}

          <div className='input-container--search'>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id='input-search'
              type='text'
              className='input-search'
              placeholder='What are you looking for?'
            />
            <Button
              onClick={() => dispatch(searchProductsThunk(inputValue))}
              variant='danger'
              size='md'
            >
              Search
            </Button>
          </div>

          <div className='justify-end filter-btn-container'>
            <i onClick={handleShow} className='bx bx-filter-alt bx-sm' />
            <p>Filters</p>
          </div>

          {/* CARD */}
          <Row xs={1} md={2} lg={1} xl={3} className='g-4 card-product'>
            {products.map((product) => (
              <Col key={product.id}>
                <Card
                  className='center-card-flex'
                >
                  <div onClick={() => navigate(`/product/${product.id}`)} className='card-images-container'>
                    <Card.Img
                      className='card-image-1'
                      variant='top'
                      src={product.images[0].url}
                    />
                    <Card.Img
                      className='card-image-2'
                      variant='top'
                      src={product.images[1].url}
                    />
                  </div>

                  <Card.Body className='card__body' onClick={() => navigate(`/product/${product.id}`)}>
                    <Stack gap={2}>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {product.brand}
                      </Card.Subtitle>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        Price
                      </Card.Subtitle>
                    </Stack>
                    <Card.Title className='card-price'>
                      ${product.price}
                    </Card.Title>
                  </Card.Body>
                  <Button onClick={() => addProduct(product.id)} size='sm' className='btn-shop' variant='success'>
                    <i className='bx bx-cart-alt bx-sm' />
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* SHOW FILTERS (MOBILE) */}

      <Offcanvas
        style={{ width: '300px' }}
        show={show}
        onHide={handleClose}
        placement='end'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <AppFilter />
        </Offcanvas.Body>
      </Offcanvas>

    </Container>
  )
}

export default Home
