import { useAuth } from '../../../library/auth'

export const Home = () => {
  const { logout } = useAuth()
  return (
    <>
      <h2>Home</h2>
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
