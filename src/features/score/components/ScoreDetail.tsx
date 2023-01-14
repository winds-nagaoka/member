import { useParams } from 'react-router-dom'
import { ContentsLoading } from '../../../components/ContentsBox'
import { useScoreDetail } from '../api/getScoreDetail'

export const ScoreDetail = () => {
  const { scoreId } = useParams()
  const scoreDetailQuery = useScoreDetail(scoreId || '')
  if (scoreDetailQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!scoreDetailQuery.data) {
    return null
  }
  return <>Detail</>
}
