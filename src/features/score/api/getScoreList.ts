import { useQuery } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

export type ScoreItem = {
  number: string
  titleJa: string
  titleEn: string
  composer: string[]
  arranger: string[]
  publisher: string
  genre: string
  scoreType: '0' | '1' | '2'
  copyMemo: string
  scoreStatus: '0' | '1' | '2'
  scoreLack: '0' | '1' | '2'
  lackList: string[]
  lendLocate: string
  scoreBased: '0' | '1' | '2'
  label: string
  boxLabel: string
  status: string
  createdAt: string
  updatedAt: string
  _id: string
}

export type ScoreListApi = {
  status: boolean
  list: ScoreItem[]
}

const getScoreList = async (query: string): Promise<ScoreListApi> => {
  return await fetchApi(`${SCORE_API_URL}/api/member/score`, { session: getSession(), query })
}

export const useScoreList = (query: string) => {
  return useQuery({
    queryKey: 'scoreList',
    queryFn: async () => await getScoreList(query),
  })
}
