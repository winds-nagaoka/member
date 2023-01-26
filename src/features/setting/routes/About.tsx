import { Layout } from '../../../components/Layout'

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
      About
    </Layout>
  )
}
