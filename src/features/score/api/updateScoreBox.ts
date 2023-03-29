import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import { useScoreBoxModalStore } from '../../../stores/scoreBoxModal'
import { getSession } from '../../../utilities/session'
import { BoxListApi } from './getBoxList'

type UpdateScoreBoxData = {
  id: string
  locate: string
}

const updateScoreBox = async (updateScoreBoxData: UpdateScoreBoxData) => {
  return await fetchApi(`${SCORE_API_URL}/api/member/box/modify`, { session: getSession(), ...updateScoreBoxData })
}

export const useUpdateScoreBox = () => {
  const { addNotification } = useNotificationStore()
  const { onClose } = useScoreBoxModalStore()

  return useMutation({
    onMutate: async (updateScoreBoxData: UpdateScoreBoxData) => {
      await queryClient.cancelQueries(['boxList'])
      const previousBoxList = queryClient.getQueryData<BoxListApi>(['boxList'])
      const newBoxList = previousBoxList?.list.map((box) => {
        return box._id !== updateScoreBoxData.id ? box : { ...box, locate: updateScoreBoxData.locate }
      })
      queryClient.setQueryData(['boxList'], { ...previousBoxList, list: newBoxList })
      return { previousBoxList }
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries(['boxList'])
      addNotification('楽譜管理箱の場所を変更しました')
    },
    mutationFn: async (updateScoreBoxData: UpdateScoreBoxData) => await updateScoreBox(updateScoreBoxData),
  })
}
