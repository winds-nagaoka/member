import { useMutation } from 'react-query'
import { AUTH_API_URL } from '../../../config'
import { USER_QUERY_KEY } from '../../../library/auth'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import type { User } from '../../../types'
import { getSession } from '../../../utilities/session'

type DeleteSessionData = {
  clientId: string
}

const deleteSession = async ({ clientId }: DeleteSessionData) => {
  return await fetchApi(`${AUTH_API_URL}/api/setting/deletesession`, { session: getSession(), clientid: clientId })
}

export const useDeleteSession = () => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onMutate: async (deleteSessionData: DeleteSessionData) => {
      await queryClient.cancelQueries(USER_QUERY_KEY)
      const previousUser = queryClient.getQueryData<User>(USER_QUERY_KEY)
      const newUser = {
        ...previousUser,
        clientList: previousUser?.clientList.filter((client) => client.id !== deleteSessionData.clientId),
      }
      queryClient.setQueryData(USER_QUERY_KEY, newUser)
      return { previousUser }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY)
      addNotification('セッションを削除しました')
    },
    mutationFn: async (deleteSessionData: DeleteSessionData) => await deleteSession(deleteSessionData),
  })
}
