import { useQuery } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'
import type { BoxItem, ScoreItem } from '../../../types'

export type ScoreDetailApi = {
  status: boolean
  data: ScoreItem
  boxList: BoxItem[]
}

const getScoreDetail = async (scoreId: string): Promise<ScoreDetailApi> => {
  return await fetchApi(`${SCORE_API_URL}/api/member/detail`, { session: getSession(), id: scoreId })
}

export const useScoreDetail = (scoreId: string) => {
  return useQuery({
    queryKey: ['scoreDetail', scoreId],
    queryFn: async () => await getScoreDetail(scoreId),
  })
}
