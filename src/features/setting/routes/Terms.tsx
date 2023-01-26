import { Layout } from '../../../components/Layout'

export const Terms = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/terms', label: 'ウィンズ会員規約' },
      ]}
      title="ウィンズ会員規約"
    >
      Terms
    </Layout>
  )
}
