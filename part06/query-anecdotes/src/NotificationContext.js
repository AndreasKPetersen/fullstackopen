import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload
        default:
            return null
    }
}

const NotificationContext = createContext()

let timeoutId = null

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    const setNotification = (notification, timeInSeconds) => {
        notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: notification
        })

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => notificationDispatch({}), timeInSeconds*1000)
    }

    return (
        <NotificationContext.Provider value={[notification, setNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}
  
export const useSetNotification = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext