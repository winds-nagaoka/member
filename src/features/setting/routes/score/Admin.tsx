import { Layout } from '../../../../components/Layout'
import { BackToHome } from '../../../../components/Navigations'
import { ChangeScoreAdmin } from '../../components/ChangeScoreAdmin'

export const Admin = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/score/admin', label: '楽譜管理者' },
      ]}
      title="楽譜管理者"
      subTitle="楽譜登録情報の追加/編集ができるようになります"
    >
      <ChangeScoreAdmin />
      <BackToHome />
    </Layout>
  )
}
