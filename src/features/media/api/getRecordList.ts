import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

type Record = {
  id: string
  time: number
  detail: {
    id: string
    directory: string
    file: { label: string; path: string }[]
    contents: {
      file: number
      list: { time: string; label: string }[]
    }[]
  }
  _id: string
}

type RecordListApi = {
  status: boolean
  url: string
  list: Record[]
}

const getRecordList = async (): Promise<RecordListApi> => {
  return await fetchApi(`${APP_API_URL}/api/record`, { session: getSession() })
}

export const useRecordList = () => {
  return useQuery({
    queryKey: 'recordList',
    queryFn: async () => await getRecordList(),
  })
}
