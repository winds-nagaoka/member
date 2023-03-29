import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

export type HistoryDetail = {
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

type History = {
  id: string
  time: number
  detail: HistoryDetail
  _id: string
}

export type HistoryListApi = {
  status: boolean
  list: History[]
}

const getHistoryList = async (): Promise<HistoryListApi> => {
  return await fetchApi(`${APP_API_URL}/api/practice`, { session: getSession() })
}

export const useHistoryList = () => {
  return useQuery({
    queryKey: 'historyList',
    queryFn: async () => await getHistoryList(),
  })
}
