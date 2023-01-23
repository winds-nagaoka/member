import styles from './Alert.module.scss'
import './react-confirm-alert.css'

export const Alert = ({
  title,
  message,
  confirmButtonLabel = '確認',
  cancelButtonLabel = 'キャンセル',
  onConfirm,
  onClose,
}: {
  title: string
  message: string
  confirmButtonLabel?: string
  cancelButtonLabel?: string
  onConfirm: () => void
  onClose: () => void
}) => {
  return (
    <div className={styles.alert}>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className={styles['button-group']}>
        <button onClick={onClose}>{cancelButtonLabel}</button>
        <button
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmButtonLabel}
        </button>
      </div>
    </div>
  )
}
