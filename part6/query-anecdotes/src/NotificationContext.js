import { createContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload
    case 'VOTE':
      return action.payload
    case 'ERROR':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export { notificationReducer }
export default NotificationContext
