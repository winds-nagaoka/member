import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

const getHistoryList = async () => {
  return await fetchApi(`${APP_API_URL}/api/reference`, { session: getSession() })
}

export const useHistoryList = () => {
  return useQuery({
    queryKey: 'historyList',
    queryFn: async () => await getHistoryList(),
  })
}
