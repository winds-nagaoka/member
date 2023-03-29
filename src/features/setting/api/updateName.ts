import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_URL } from '../../../config'
import { USER_QUERY_KEY } from '../../../library/auth'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import type { User } from '../../../types'
import { getSession } from '../../../utilities/session'

type UpdateUsernameData = {
  username: string
}

const updateUsername = async ({ username }: UpdateUsernameData) => {
  return await fetchApi(`${AUTH_API_URL}/api/setting/username`, { session: getSession(), text: username })
}

export const useUpdateUsername = () => {
  const { addNotification } = useNotificationStore()
  const navigate = useNavigate()

  return useMutation({
    onMutate: async (updateUsernameData: UpdateUsernameData) => {
      await queryClient.cancelQueries(USER_QUERY_KEY)
      const previousUser = queryClient.getQueryData<User>(USER_QUERY_KEY)
      const newUser = {
        ...previousUser,
        name: updateUsernameData.username,
      }
      queryClient.setQueryData(USER_QUERY_KEY, newUser)
      return { previousUser }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY)
      addNotification('変更しました')
      navigate('/setting')
    },
    mutationFn: async (updateUsernameData: UpdateUsernameData) => await updateUsername(updateUsernameData),
  })
}
