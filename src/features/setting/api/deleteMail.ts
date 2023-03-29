import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_URL } from '../../../config'
import { USER_QUERY_KEY } from '../../../library/auth'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import type { User } from '../../../types'
import { getSession } from '../../../utilities/session'

const deleteMail = async () => {
  return await fetchApi(`${AUTH_API_URL}/api/setting/email`, { session: getSession(), text: '', delMail: true })
}

export const useDeleteMail = () => {
  const { addNotification } = useNotificationStore()
  const navigate = useNavigate()

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(USER_QUERY_KEY)
      const previousUser = queryClient.getQueryData<User>(USER_QUERY_KEY)
      const newUser = {
        ...previousUser,
        email: '',
        emailValid: false,
      }
      queryClient.setQueryData(USER_QUERY_KEY, newUser)
      return { previousUser }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY)
      addNotification('メールアドレスを削除しました')
      navigate('/setting')
    },
    mutationFn: async () => await deleteMail(),
  })
}
