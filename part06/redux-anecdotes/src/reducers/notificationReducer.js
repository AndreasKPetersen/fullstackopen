import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      notificationChange(state, action) {
        state = action.payload
        return state
      }
    }
})

export const { notificationChange } = notificationSlice.actions

let timeoutId = null

export const setNotification = (notification, timeInSeconds) => {
  return async dispatch => {
    dispatch(notificationChange(notification))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => dispatch(notificationChange(null)), timeInSeconds*1000)
  }
}

export default notificationSlice.reducer