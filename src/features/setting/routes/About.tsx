import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { BackLink } from '../../../components/Navigations/BackLink'
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
      <BackLink path="/setting" />
      <BackToHome />
    </Layout>
  )
}
