import { ContentsLoading } from '../../../components/ContentsBox'
import { useHistoryList } from '../api/getHistoryList'

export const HistoryList = () => {
  const historyListQuery = useHistoryList()

  if (historyListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!historyListQuery.data) {
    return null
  }

  return <>HistoryList</>
}
