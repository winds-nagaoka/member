import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import type { ScoreItem } from '../../../types'
import { getSession } from '../../../utilities/session'

export type UpdateScoreData =
  | {
      mode: 'new'
      scoreItem: Omit<ScoreItem, 'createdAt' | 'updatedAt' | '_id'>
    }
  | {
      mode: 'edit'
      id: string
      scoreItem: ScoreItem
    }

type Response = { status: boolean }

const updateScore = ({ scoreItem, mode }: UpdateScoreData): Promise<Response> => {
  console.log('updateScore', scoreItem)
  return fetchApi(`${SCORE_API_URL}/api/member/edit`, { session: getSession(), mode, data: scoreItem })
}

export const useUpdateScore = (updateScoreData: UpdateScoreData) => {
  return useMutation({
    onMutate: () => {
      console.log('onMutate')
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: () => {
      console.log('onSuccess')
    },
    mutationFn: async () => await updateScore(updateScoreData),
  })
}
