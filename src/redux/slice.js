import { createSlice } from '@reduxjs/toolkit'

export const StateSlice = createSlice({
  name: 'state',
  initialState: {
    value_of_clr_button: false,
  },
  reducers: {
    clear_path: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      
      state.value_of_clr_button = action.payload;
      
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { clear_path, decrement, incrementByAmount } = StateSlice.actions

export default StateSlice.reducer