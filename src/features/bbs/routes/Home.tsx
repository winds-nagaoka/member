import { Layout } from '../../../components/Layout'

export const Home = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/bbs', label: '掲示板' },
      ]}
      title="会員専用掲示板"
    >
      bbs home
    </Layout>
  )
}
