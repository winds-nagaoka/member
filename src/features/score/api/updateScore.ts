import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { useNotificationStore } from '../../../stores/notification'
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

type UpdateScoreReturn = {
  response: { status: boolean }
  mode: 'new' | 'edit'
}

const updateScore = async (updateScoreData: UpdateScoreData): Promise<UpdateScoreReturn> => {
  const { mode, scoreItem } = updateScoreData
  console.log('updateScore', scoreItem)
  if (updateScoreData.mode === 'new') {
    const response = await fetchApi(`${SCORE_API_URL}/api/member/edit`, {
      session: getSession(),
      mode,
      data: scoreItem,
    })
    return { response, mode }
  } else {
    const { id } = updateScoreData
    const response = await fetchApi(`${SCORE_API_URL}/api/member/edit`, {
      session: getSession(),
      mode,
      id,
      data: scoreItem,
    })
    return { response, mode }
  }
}

export const useUpdateScore = () => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onMutate: () => {
      console.log('onMutate')
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: (result) => {
      console.log('onSuccess')
      addNotification(result.mode === 'new' ? '新しい楽譜を追加しました' : '楽譜情報を修正しました')
    },
    mutationFn: async (updateScoreData: UpdateScoreData) => await updateScore(updateScoreData),
  })
}
