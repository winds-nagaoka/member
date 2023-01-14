import { useQuery } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'
import type { ScoreItem } from '../../../types'

export type ScoreListApi = {
  status: boolean
  list: ScoreItem[]
}

const getScoreList = async (query: string): Promise<ScoreListApi> => {
  return await fetchApi(`${SCORE_API_URL}/api/member/score`, { session: getSession(), query })
}

export const useScoreList = (query: string) => {
  return useQuery({
    queryKey: ['scoreList', query],
    queryFn: async () => await getScoreList(query),
  })
}
