import { ContentsLayout } from '../../../components/Layout/ContentsLayout'
import { useAuth } from '../../../library/auth'

export const Dashboard = () => {
  const { logout } = useAuth()
  return (
    <ContentsLayout breadList={[{ path: '/', label: 'ホーム' }]} title="会員専用ページ">
      <h2>Home</h2>
      <button
        onClick={async () => {
          await logout()
        }}
      >
        ログアウト
      </button>
    </ContentsLayout>
  )
}
