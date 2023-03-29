import { useQuery } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import type { ScoreItem } from '../../../types'
import { getSession } from '../../../utilities/session'

export type InputListApi = {
  status: boolean
  list: ScoreItem[]
}

const getInputList = async (target: string, query: string): Promise<InputListApi> => {
  return await fetchApi(`${SCORE_API_URL}/api/member/input`, { session: getSession(), target, query })
}

export const useInputList = (target: string, query: string) => {
  return useQuery({
    queryKey: ['inputList', target, query],
    queryFn: async () => await getInputList(target, query),
  })
}
