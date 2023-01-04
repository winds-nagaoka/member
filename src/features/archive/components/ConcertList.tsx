import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { useConcertList } from '../api/getConcertList'

export const ConcertList = () => {
  const concertListQuery = useConcertList()
  if (concertListQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!concertListQuery.data) {
    return null
  }
  return <ContentsBox>演奏会一覧</ContentsBox>
}
