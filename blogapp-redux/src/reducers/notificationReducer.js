import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
  },
})

export const { newNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(newNotification(content))
    setTimeout(
      () => {
        dispatch(newNotification(null))
      },
      Number(timeout) * 1000
    )
  }
}

export default notificationSlice.reducer
