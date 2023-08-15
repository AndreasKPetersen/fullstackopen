import { useSelector } from "react-redux"

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)
  if (message) {
    const notificationStyle =
      type === "success" ? "successMessage" : "errorMessage"
    return <div className={notificationStyle}>{message}</div>
  }
}

export default Notification
