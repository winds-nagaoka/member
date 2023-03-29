import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_URL } from '../../../config'
import { USER_QUERY_KEY } from '../../../library/auth'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import { getSession } from '../../../utilities/session'

type UpdatePasswordData = {
  oldPassword: string
  newPassword: string
}

const updatePassword = async ({ oldPassword, newPassword }: UpdatePasswordData) => {
  return await fetchApi(`${AUTH_API_URL}/api/setting/password`, {
    session: getSession(),
    old: oldPassword,
    new: newPassword,
  })
}

export const useUpdatePassword = () => {
  const { addNotification } = useNotificationStore()
  const navigate = useNavigate()

  return useMutation({
    onSuccess: (response) => {
      if (!response.status) {
        return addNotification('古いパスワードを確認してください')
      }
      queryClient.invalidateQueries(USER_QUERY_KEY)
      addNotification('変更しました')
      navigate('/setting')
    },
    mutationFn: async (updatePasswordData: UpdatePasswordData) => await updatePassword(updatePasswordData),
  })
}
