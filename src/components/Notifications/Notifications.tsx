import { useNotificationStore } from '../../stores/notification'

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore()
  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.timeId}>
          {notification.message}
          <button onClick={() => dismissNotification(notification.timeId)}>close</button>
        </div>
      ))}
    </div>
  )
}
