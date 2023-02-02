import { Layout } from '../../../components/Layout'
import { AboutDetail } from '../components/AboutDetail'

export const About = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/about', label: 'このアプリについて' },
      ]}
      title="このアプリについて"
    >
      <AboutDetail />
    </Layout>
  )
}
