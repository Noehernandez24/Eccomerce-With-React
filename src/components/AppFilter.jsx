import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { filterProductsThunk, setProducts } from '../store/slices/products.slice'

const AppFilter = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const [allProducts, setAllProducts] = useState([]) // for filter by price
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
      .then(res => setCategories(res.data))

    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
      .then(res => setAllProducts(res.data))
  }, [])

  const filterByPrice = (data) => {
    const productsFilter = allProducts.filter(product => product.price >= Number(data.from) && product.price <= Number(data.to))
    if (productsFilter.length !== 0) {
      dispatch(setProducts(productsFilter))
    } else {
      dispatch(setProducts(allProducts))
    }
  }

  return (
    <Accordion className='acordion' defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>Price</Accordion.Header>
        <Accordion.Body>
          <Form style={{ textAlign: 'end' }} onSubmit={handleSubmit(filterByPrice)}>
            <Form.Group style={{ textAlign: 'start' }} className='mb-3' controlId='from'>
              <Form.Label>From</Form.Label>
              <Form.Control {...register('from')} type='text' placeholder='Ej: $500' />
            </Form.Group>

            <Form.Group style={{ textAlign: 'start' }} className='mb-3' controlId='to'>
              <Form.Label>To</Form.Label>
              <Form.Control {...register('to')} type='text' placeholder='Ej: $1000' />
            </Form.Group>

            <button className='btn-price' variant='danger'>Filter Price</button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1'>
        <Accordion.Header>Category</Accordion.Header>
        <Accordion.Body>
          <div className='buttons-container'>
            {categories.map((categorie) => (
              <button
                onClick={() => dispatch(filterProductsThunk(categorie.id))}
                key={categorie.id}
                className='btn-filter'
              >
                {categorie.name}
              </button>
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AppFilter
