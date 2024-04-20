import { configureStore } from '@reduxjs/toolkit'
import productosReducer from './features/productosSlice'

export const store = configureStore({
  reducer: {
    productosReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch