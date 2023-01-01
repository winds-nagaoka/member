import { Button } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import { useNotificationStore } from '../../../stores/notification'

export const Home = () => {
  const { logout } = useAuth()
  const { addNotification } = useNotificationStore()
  return (
    <>
      <h2>Home</h2>
      <div>
        <Button onClick={() => addNotification('通知' + Math.round(Math.random() * 100))}>通知を追加</Button>
      </div>
      <button
        onClick={async () => {
          await logout()
        }}
      >
        ログアウト
      </button>
    </>
  )
}
