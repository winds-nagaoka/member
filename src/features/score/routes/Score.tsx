import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { ScoreList } from '../components/ScoreList'

export const Score = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/score', label: 'ウィンズスコア' },
      ]}
      title="ウィンズスコア"
      subTitle="ウィンズが所有している楽譜です"
    >
      <ScoreList />
      <BackToHome />
    </Layout>
  )
}
