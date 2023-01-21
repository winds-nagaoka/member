import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import { useScoreEditModalStore } from '../../../stores/scoreEditModal'
import type { ScoreItem, ScoreEdit } from '../../../types'
import { getSession } from '../../../utilities/session'
import type { ScoreDetailApi } from './getScoreDetail'
import type { ScoreListApi } from './getScoreList'

export type UpdateScoreData =
  | {
      mode: 'new'
      scoreItem: Omit<ScoreItem, 'createdAt' | 'updatedAt' | '_id'>
    }
  | {
      mode: 'edit'
      id: string
      scoreItem: ScoreEdit
    }

type UpdateScoreReturn = {
  response: { status: boolean }
  mode: 'new' | 'edit'
  id: string | null
}

const updateScore = async (updateScoreData: UpdateScoreData): Promise<UpdateScoreReturn> => {
  const { mode, scoreItem } = updateScoreData
  if (updateScoreData.mode === 'new') {
    const response = await fetchApi(`${SCORE_API_URL}/api/member/edit`, {
      session: getSession(),
      mode,
      data: scoreItem,
    })
    return { response, mode, id: null }
  } else {
    const { id } = updateScoreData
    const response = await fetchApi(`${SCORE_API_URL}/api/member/edit`, {
      session: getSession(),
      mode,
      id,
      data: scoreItem,
    })
    return { response, mode, id }
  }
}

export const useUpdateScore = () => {
  const { addNotification } = useNotificationStore()
  const { onClose } = useScoreEditModalStore()

  return useMutation({
    onMutate: async (updateScoreData: UpdateScoreData) => {
      if (updateScoreData.mode === 'new') {
        await queryClient.cancelQueries(['scoreList', ''])
        const previousScoreList = queryClient.getQueryData<ScoreListApi>(['scoreList', ''])
        queryClient.setQueryData(['scoreList', ''], {
          ...previousScoreList,
          list: [
            ...(previousScoreList?.list || []),
            { ...updateScoreData.scoreItem, _id: updateScoreData.scoreItem.label },
          ],
        })
        return { previousScoreList }
      } else {
        await queryClient.cancelQueries(['scoreDetail', updateScoreData.id])
        const previousDetailScore = queryClient.getQueryData<ScoreDetailApi>(['scoreDetail', updateScoreData.id])
        queryClient.setQueryData(['scoreDetail', updateScoreData.id], {
          ...previousDetailScore,
          data: {
            ...previousDetailScore?.data,
            ...updateScoreData.scoreItem,
          },
        })
        return { previousDetailScore }
      }
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: (result) => {
      onClose()
      if (result.mode === 'new') {
        queryClient.invalidateQueries(['scoreList', ''])
        queryClient.invalidateQueries(['preEdit', 'new', false])
        addNotification('新しい楽譜を追加しました')
      } else {
        queryClient.invalidateQueries(['scoreDetail', result.id])
        queryClient.invalidateQueries(['preEdit', 'edit', result.id])
        addNotification('楽譜情報を修正しました')
      }
    },
    mutationFn: async (updateScoreData: UpdateScoreData) => await updateScore(updateScoreData),
  })
}
