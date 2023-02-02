import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import { setIsLoading } from './isLoading.slice'

export const cartProductSlice = createSlice({
  name: 'cartProducts',
  initialState: [],
  reducers: {
    setCartProducts: (state, action) => {
      const cart = action.payload
      return cart
    }
  }
})

export const getCartThunk = () => dispatch => {
  dispatch(setIsLoading(true))
  axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
    .then(res => dispatch(setCartProducts(res.data)))
    .finally(dispatch(setIsLoading(false)))
}

export const addProductToCartThunk = (data) => dispatch => {
  dispatch(setIsLoading(true))
  axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)))
}

export const deleteProductCartThunk = (id) => dispatch => {
  dispatch(setIsLoading(true))
  axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)))
}

export const purcharseCartThunk = () => dispatch => {
  dispatch(setIsLoading(true))
  axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {}, getConfig())
    .then(() => {
      dispatch(getCartThunk())
      Swal.fire(
        {
          icon: 'success',
          title: 'Thanks for your purchase!',
          text: 'Your order has been successfully completed',
          confirmButtonColor: '#f85555'
        }
      )
    }) // set cart
    .catch(() => {
      Swal.fire(
        {
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred, try again later',
          confirmButtonColor: '#f85555'
        }
      )
    })
    .finally(() => dispatch(setIsLoading(false)))
}

export const updateProductQuantityThunk = (id, data) => dispatch => {
  dispatch(setIsLoading(true))
  axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, data, getConfig())
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setCartProducts } = cartProductSlice.actions

export default cartProductSlice.reducer
