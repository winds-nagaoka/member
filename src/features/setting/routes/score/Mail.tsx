import { Layout } from '../../../../components/Layout'
import { BackToHome } from '../../../../components/Navigations'
import { BackLink } from '../../../../components/Navigations/BackLink'
import { ScoreData } from '../../components/ScoreData'

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
      <ScoreData />
      <BackLink path="/setting" />
      <BackToHome />
    </Layout>
  )
}
