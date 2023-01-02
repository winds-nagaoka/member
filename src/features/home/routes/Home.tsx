import { Layout } from '../../../components/Layout'
import { Dashboard } from '../components/Dashboard'

export const Home = () => {
  return (
    <Layout breadList={[{ path: '/', label: 'ホーム' }]} title="会員専用ページ">
      <Dashboard />
    </Layout>
  )
}
