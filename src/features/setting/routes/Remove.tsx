import { Layout } from '../../../components/Layout'

export const Remove = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/delete', label: 'アカウントの削除' },
      ]}
      title="アカウントの削除"
      subTitle="ウィンズサーバから関連する全ての情報が削除されます。"
    >
      Remove
    </Layout>
  )
}
