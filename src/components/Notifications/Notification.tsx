import styles from './Notification.module.scss'
import clsx from 'clsx'
import type { Notification as NotificationType } from '../../stores/notification'

export const Notification = ({
  notification,
  onDismiss,
}: {
  notification: NotificationType
  onDismiss: (timeId: number) => void
}) => {
  return (
    <div key={notification.timeId} className={clsx(styles.notification, styles[notification.state])}>
      <div>{notification.message}</div>
      <button onClick={() => onDismiss(notification.timeId)}>close</button>
    </div>
  )
}
