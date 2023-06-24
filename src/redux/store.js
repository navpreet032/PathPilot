import { configureStore } from '@reduxjs/toolkit'
import StateReducer from './slice'

export default configureStore({
  reducer: {
    state: StateReducer,
  },
})