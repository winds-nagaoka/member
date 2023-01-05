import { useQuery } from 'react-query'
import { getSession } from '../../../utilities/session'
import { fetchApi } from '../../../library/fetch'
import { APP_API_URL } from '../../../config'
import type { Source } from '../../../types'

export type SourceListApi = { status: boolean; list: Source[] }

const getSourceList = async (): Promise<SourceListApi> => {
  return await fetchApi(`${APP_API_URL}/api/source`, { session: getSession() })
}

export const useSourceList = () => {
  return useQuery({
    queryKey: 'sourceList',
    queryFn: () => getSourceList(),
  })
}
