import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

type HistoryListResponse = {
  status: boolean
  list: {
    id: string
    time: number
    detail: {
      id: string
      recordStatus: boolean
      time: {
        timestamp: boolean
        date: string
        time: string
      }
      place: string[]
      label: string
    }
    _id: string
  }[]
}

const getHistoryList = async (): Promise<HistoryListResponse> => {
  return await fetchApi(`${APP_API_URL}/api/practice`, { session: getSession() })
}

export const useHistoryList = () => {
  return useQuery({
    queryKey: 'historyList',
    queryFn: async () => await getHistoryList(),
  })
}
