/**
 * This module exports a Redux store instance configured with a single reducer.
 * The reducer is defined in the 'slice.js' file and is named 'StateReducer'.
 * @module redux/store
 */

import { configureStore } from '@reduxjs/toolkit'
import StateReducer from './slice'

export default configureStore({
  reducer: {
    state: StateReducer,
  },
})