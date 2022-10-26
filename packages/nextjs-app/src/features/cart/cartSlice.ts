import { createAsyncThunk, createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import type { RootState } from '../../store'
import {Cart,getCart} from '@rkonings/cart'

interface CartState {
  cart: Cart
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CartState = {
  cart: null,
  loading: 'idle',
  
}

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async () => {
    const response = await getCart()
    return response
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.loading = 'pending'
    }),
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      console.log(action.payload)
    })
    builder.addCase(createAction<{cart: CartState}>(HYDRATE),(state, action) => {
      state = action.payload.cart

      return state
    })
  }
})

export const CartActions = cartSlice.actions
export const selectCart = (state: RootState) => state.cart.cart
