import { Layout } from '../../../components/Layout'

export const Photo = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/archive', label: 'アーカイブ' },
        { path: '/archive/overview/:id', label: '第35回定期演奏会' },
        { path: '/archive/photo/:id', label: '写真' },
      ]}
      title="アーカイブ"
      subTitle="過去のウィンズの活動履歴を確認できます"
    >
      Photo
    </Layout>
  )
}
