import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_URL } from '../../../config'
import { USER_QUERY_KEY } from '../../../library/auth'
import { fetchApi } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { useNotificationStore } from '../../../stores/notification'
import { getSession } from '../../../utilities/session'

type UpdateScoreAdminData = {
  admin: boolean
  password: string
}

type UpdateScoreAdminResponse = {
  status: boolean
  admin: boolean
  error: boolean
}

const updateScoreAdmin = async (updateScoreAdminData: UpdateScoreAdminData): Promise<UpdateScoreAdminResponse> => {
  return await fetchApi(`${AUTH_API_URL}/api/setting/score/admin`, {
    session: getSession(),
    admin: String(updateScoreAdminData.admin),
    pass: updateScoreAdminData.password,
  })
}

export const useUpdateScoreAdmin = () => {
  const { addNotification } = useNotificationStore()
  const navigate = useNavigate()

  return useMutation({
    onSuccess: (response) => {
      if (!response.status) {
        return addNotification('通信エラーです')
      }
      if (response.error) {
        return addNotification('管理者パスワードが違います')
      }
      queryClient.invalidateQueries(USER_QUERY_KEY)
      const message = response.admin ? '楽譜管理者になりました' : '楽譜管理者を辞めました'
      addNotification(message)
      navigate('/setting')
    },
    mutationFn: async (updateScoreAdminData: UpdateScoreAdminData) => await updateScoreAdmin(updateScoreAdminData),
  })
}
