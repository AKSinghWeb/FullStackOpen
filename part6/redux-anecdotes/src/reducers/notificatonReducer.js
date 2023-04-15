import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlicer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotifcation(state, action) {
      return ''
    },
  },
})

export const { showNotification, removeNotifcation } =
  notificationSlicer.actions

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(removeNotifcation()), time * 1000)
  }
}

export default notificationSlicer.reducer
