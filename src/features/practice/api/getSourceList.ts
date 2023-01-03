import { useQuery } from 'react-query'
import { getSession } from '../../../utilities/session'
import { fetchApi } from '../../../library/fetch'
import { APP_API_URL } from '../../../config'

const getSourceList = async () => {
  return await fetchApi(`${APP_API_URL}/api/source`, { session: getSession() })
}

export const useSourceList = () => {
  return useQuery({
    queryKey: 'sourceList',
    queryFn: () => getSourceList(),
  })
}
