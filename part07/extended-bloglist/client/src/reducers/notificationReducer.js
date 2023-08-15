import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, type: null },
  reducers: {
    notificationChange(state, action) {
      const { message, type } = action.payload || {}
      state.message = message
      state.type = type
      return state
    },
  },
})

export const { notificationChange } = notificationSlice.actions

let timeoutId = null

export const setNotification = (message, type, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(notificationChange({ message, type }))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(
      () => dispatch(notificationChange()),
      timeInSeconds * 1000
    )
  }
}

export default notificationSlice.reducer
