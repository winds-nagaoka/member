import { Layout } from '../../../components/Layout'

export const Overview = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/archive', label: 'アーカイブ' },
        { path: '/archive/overview/', label: '第35回定期演奏会' },
      ]}
      title="アーカイブ"
      subTitle="過去のウィンズの活動履歴を確認できます"
    >
      Overview
    </Layout>
  )
}
