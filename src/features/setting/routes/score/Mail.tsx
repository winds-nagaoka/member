import { Layout } from '../../../../components/Layout'

export const Mail = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/score/mail', label: 'CSV出力' },
      ]}
      title="CSV出力"
      subTitle="ウィンズスコア一覧をCSVにて登録されたメールアドレスへ送信します。"
    >
      Score Mail
    </Layout>
  )
}
