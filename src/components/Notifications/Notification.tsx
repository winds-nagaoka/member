import styles from './Notification.module.scss'
import clsx from 'clsx'
import type { Notification as NotificationType } from '../../stores/notification'
import { ReactComponent as Close } from '../../assets/close.svg'

export const Notification = ({
  notification,
  onDismiss,
}: {
  notification: NotificationType
  onDismiss: (timeId: number) => void
}) => {
  return (
    <div key={notification.timeId} className={clsx(styles.notification, styles[notification.state])}>
      <div className={styles.message}>{notification.message}</div>
      <div onClick={() => onDismiss(notification.timeId)} className={styles.close}>
        <Close />
      </div>
    </div>
  )
}
