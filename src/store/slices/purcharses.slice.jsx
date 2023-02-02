import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { setIsLoading } from './isLoading.slice'

export const purcharsesSlice = createSlice({
  name: 'purcharses',
  initialState: [],
  reducers: {
    setPurcharses: (state, action) => {
      const purcharses = action.payload
      return purcharses
    }
  }
})

export const getPurcharsesThunk = () => dispatch => {
  dispatch(setIsLoading(true))
  axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
    .then(res => dispatch(setPurcharses(res.data)))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setPurcharses } = purcharsesSlice.actions

export default purcharsesSlice.reducer
