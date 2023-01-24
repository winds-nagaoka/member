import { Layout } from '../../../components/Layout'
import { Menu } from '../components/Menu'

export const Home = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
      ]}
      title="設定"
      subTitle="各種設定はこちらから"
    >
      <Menu />
    </Layout>
  )
}
