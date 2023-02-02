import React, { useEffect } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPurcharsesThunk } from '../store/slices/purcharses.slice'
import '../styles/purcharses.css'

const Purcharses = () => {
  const navigate = useNavigate()
  const purcharses = useSelector((state) => state.purcharses)
  const dispatch = useDispatch()
  // console.log(purcharses)

  useEffect(() => {
    dispatch(getPurcharsesThunk())
  }, [])

  return (
    <Container className='purcharses'>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Purcharses</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className='purcharses__title'>My purcharses</h3>

      <div className='purcharses___container'>
        {purcharses.map(purcharse => (
          <div onClick={() => navigate(`/product/${purcharse.product.id}`)} key={purcharse.id} className='purcharses__card'>

            <div className='card-image-container'>
              <img
                src={purcharse.product?.images[0].url}
                alt=''
                className='purcharses__img'
              />
            </div>

            <span className='purcharses__name'>{purcharse.product?.title}</span>
            <span className='purcharses__date'>{purcharse.product?.createdAt.slice(0, 10)}</span>
            <div className='quantity-container'>
              <span className='purcharses__quantity'>{purcharse.quantity}</span>
            </div>
            <p className='purcharses__total'>{`$${purcharse.product?.price}`}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Purcharses
