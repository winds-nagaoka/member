import { Layout } from '../../../components/Layout'
import { useAuth } from '../../../library/auth'

export const Home = () => {
  const { logout } = useAuth()
  return (
    <Layout>
      <h2>Home</h2>
      <button
        onClick={async () => {
          await logout()
        }}
      >
        ログアウト
      </button>
    </Layout>
  )
}
