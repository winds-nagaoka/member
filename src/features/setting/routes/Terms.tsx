import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { TermsDetail } from '../components/TermsDetail'

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
      <TermsDetail />
      <BackToHome />
    </Layout>
  )
}
