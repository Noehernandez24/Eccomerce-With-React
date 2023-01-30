import { configureStore } from '@reduxjs/toolkit'
import cartProductSlice from './slices/cartProducts.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice  from './slices/products.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        cartProducts: cartProductSlice,

    }
})
