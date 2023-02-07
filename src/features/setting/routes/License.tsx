import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { LicenseDetail } from '../components/LicenseDetail'

export const License = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/license', label: 'ライセンス情報' },
      ]}
      title="ライセンス情報"
    >
      <LicenseDetail />
      <BackToHome />
    </Layout>
  )
}
