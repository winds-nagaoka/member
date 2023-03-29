import { useQuery } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'
import type { BoxItem } from '../../../types'

export type BoxListApi = {
  status: boolean
  list: BoxItem[]
}

const getBoxList = async (): Promise<BoxListApi> => {
  return await fetchApi(`${SCORE_API_URL}/api/member/box`, { session: getSession() })
}

export const useBoxList = () => {
  return useQuery({
    queryKey: ['boxList'],
    queryFn: async () => await getBoxList(),
  })
}
