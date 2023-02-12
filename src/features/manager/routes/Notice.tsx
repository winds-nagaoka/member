import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { NoticeDetail } from '../components/NoticeDetail'

export const Notice = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/manager', label: 'お知らせ' },
      ]}
      title="事務局からのお知らせ"
      mobileTitle="お知らせ"
    >
      <NoticeDetail />
      <BackToHome />
    </Layout>
  )
}
