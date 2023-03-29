import { useNotificationStore } from '../../stores/notification'
import { Notification } from './Notification'
import styles from './Notifications.module.scss'

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore()
  return (
    <div className={styles.notifications}>
      {notifications.map((notification) => (
        <Notification key={notification.timeId} notification={notification} onDismiss={dismissNotification} />
      ))}
    </div>
  )
}
