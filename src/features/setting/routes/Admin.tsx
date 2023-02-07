import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { ChangeAdmin } from '../components/ChangeAdmin'

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
      <ChangeAdmin />
      <BackToHome />
    </Layout>
  )
}
