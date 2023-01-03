import { ContentsLoading } from '../../../components/ContentsBox'
import { useSourceList } from '../api/getSourceList'

export const SourceList = () => {
  const sourceListQuery = useSourceList()
  if (sourceListQuery.isLoading) {
    return <ContentsLoading />
  }
  return <></>
}
