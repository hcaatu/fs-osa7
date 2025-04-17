import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>{notification && <div class="notification">{notification}</div>}</div>
  )
}

export default Notification
