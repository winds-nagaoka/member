import { useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { ScoreDetail } from '../components/ScoreDetail'

export const Detail = () => {
  const { scoreId } = useParams()
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/score', label: 'ウィンズスコア' },
        { path: `/score/detail/${scoreId}`, label: '詳細情報' },
      ]}
      title="ウィンズスコア"
      subTitle="楽譜詳細情報"
    >
      <ScoreDetail />
      <BackToHome />
    </Layout>
  )
}
