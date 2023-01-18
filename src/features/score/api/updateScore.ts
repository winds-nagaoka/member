import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import type { ScoreItem } from '../../../types'
import { getSession } from '../../../utilities/session'

type UpdateScore = {
  scoreItem: ScoreItem
}

type Response = { status: boolean }

const updateScore = ({ scoreItem }: UpdateScore): Promise<Response> => {
  return fetchApi(`${SCORE_API_URL}/api/member/edit`, { session: getSession(), mode: 'new', data: scoreItem })
}

export const useUpdateScore = (scoreItem: UpdateScore) => {
  return useMutation(() => updateScore(scoreItem))
}
