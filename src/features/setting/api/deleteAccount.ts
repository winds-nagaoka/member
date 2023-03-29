import { useMutation } from 'react-query'
import { AUTH_API_URL } from '../../../config'
import { useAuth } from '../../../library/auth'
import { fetchApi } from '../../../library/fetch'
import { useNotificationStore } from '../../../stores/notification'
import { getSession } from '../../../utilities/session'

type DeleteAccountData = {
  password: string
}

type DeleteAccountResponse = {
  status: boolean
}

const deleteAccount = async ({ password }: DeleteAccountData): Promise<DeleteAccountResponse> => {
  return await fetchApi(`${AUTH_API_URL}/api/setting/delete`, { session: getSession(), pass: password })
}

export const useDeleteAccount = () => {
  const { addNotification } = useNotificationStore()
  const { logout } = useAuth()

  return useMutation({
    onSuccess: (response) => {
      if (!response.status) {
        return addNotification('パスワードを確認してください')
      }
      addNotification('削除しました')
      logout()
    },
    mutationFn: async (deleteAccountData: DeleteAccountData) => await deleteAccount(deleteAccountData),
  })
}
