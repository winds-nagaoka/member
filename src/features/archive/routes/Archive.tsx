import { Layout } from '../../../components/Layout'
import { ConcertList } from '../components/ConcertList'

export const Archive = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/archive', label: 'アーカイブ' },
      ]}
      title="アーカイブ"
      subTitle="過去のウィンズの活動履歴を確認できます"
    >
      <ConcertList />
    </Layout>
  )
}
