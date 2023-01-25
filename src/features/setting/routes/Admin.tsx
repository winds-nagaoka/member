import { Layout } from '../../../components/Layout'

export const Admin = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/admin', label: '管理者設定' },
      ]}
      title="管理者"
      subTitle="いろいろできるようになります"
    >
      Admin
    </Layout>
  )
}
