/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductCartThunk, getCartThunk, purcharseCartThunk, updateProductQuantityThunk } from '../store/slices/cartProducts.slice'

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getCartThunk())
    }
  }, [])

  // console.log(cartProducts)

  const totalPurcharse = () => {
    let total = 0
    cartProducts.forEach(product => {
      const productTotal = product.product.price * product.quantity
      total += productTotal
    })

    return (
      <span className='special-color'>${total}</span>
    )
  }

  const decrementQuantityProduct = (id, quantity) => {
    if (quantity > 1) {
      const quantityNew = quantity - 1
      const product = {
        quantity: quantityNew
      }

      dispatch(updateProductQuantityThunk(id, product))
    } else {
      dispatch(deleteProductCartThunk(id))
    }
  }

  const icrementQuantityProduct = (id, quantity) => {
    const quantityNew = quantity + 1
    const product = {
      quantity: quantityNew
    }

    dispatch(updateProductQuantityThunk(id, product))
  }

  return (
    <>
      {/* OffCanvas CART */}

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvas-cart-container'>
          <section className='cart-all-products-container'>
            {cartProducts.map((cartProduct) => (
              <div key={cartProduct.id} className='cart-card'>
                <div className='cart-product'>
                  <img
                    className='cart-img'
                    src={cartProduct.product.images[0].url}
                  />
                  <div className='cart-detail'>
                    <p className='cart-title'>{cartProduct.product.title}</p>
                    <div className='btn-container btn-container--cart'>
                      <button onClick={() => decrementQuantityProduct(cartProduct.id, cartProduct.quantity)} className='btn-counter'>-</button>

                      <span className='counter'>{cartProduct.quantity}</span>

                      <button onClick={() => icrementQuantityProduct(cartProduct.id, cartProduct.quantity)} className='btn-counter'>+</button>

                      <button onClick={() => dispatch(deleteProductCartThunk(cartProduct.id))} className='btn-delete'>
                        <i className='bx bx-trash' />
                      </button>
                    </div>
                  </div>
                </div>

                <p className='cart-total'>
                  Total:{' '}
                  <span className='special-color'>
                    ${cartProduct.product.price * cartProduct.quantity}
                  </span>
                </p>
              </div>
            ))}
          </section>

          <div className='cart-checkout'>
            <hr />
            <p className='cart-total cart-total--check'>
              Total: {totalPurcharse()}
            </p>
            <button onClick={() => dispatch(purcharseCartThunk())} className='btn-checkout'>Check Out</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Cart
