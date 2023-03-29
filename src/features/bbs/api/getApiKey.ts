import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

type ApiKeyResponse = {
  status: boolean
  api: string
}

const getApiKey = async (): Promise<ApiKeyResponse> => {
  return await fetchApi(`${APP_API_URL}/api/bbs`, { session: getSession() })
}

export const useApiKey = () => {
  return useQuery({
    queryKey: ['apiKey'],
    queryFn: async () => await getApiKey(),
  })
}
