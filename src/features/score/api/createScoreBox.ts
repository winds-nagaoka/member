import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import { getSession } from '../../../utilities/session'
import { BoxListApi } from './getBoxList'

const createScoreBox = async () => {
  return await fetchApi(`${SCORE_API_URL}/api/member/box/add`, { session: getSession() })
}

export const useCreateScoreBox = () => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(['boxList'])
      const previousBoxList = queryClient.getQueryData<BoxListApi>(['boxList'])
      const expectNewBoxItem = {
        status: true,
        number: previousBoxList?.list.length,
        label: 'new',
        locate: false,
        time: new Date().getTime(),
        _id: new Date().getTime(),
      }
      queryClient.setQueryData(['boxList'], {
        ...previousBoxList,
        list: [...(previousBoxList?.list || []), expectNewBoxItem],
      })
      return { previousBoxList }
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['boxList'])
      addNotification('新しい楽譜管理箱を追加しました')
    },
    mutationFn: createScoreBox,
  })
}
