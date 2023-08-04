import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      notificationChange(state, action) {
        state = action.payload
        return state
      }
    }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer