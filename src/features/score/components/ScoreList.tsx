import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { useScoreList } from '../api/getScoreList'

export const ScoreList = () => {
  const scoreListQuery = useScoreList('')

  if (scoreListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!scoreListQuery.data) {
    return null
  }

  return <ContentsBox>scoreList</ContentsBox>
}
