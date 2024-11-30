import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counter'
import accountReducer from './slice/accountSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer
  },
})