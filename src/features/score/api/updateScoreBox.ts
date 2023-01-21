import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

type UpdateScoreBoxData = {
  id: string
  locate: string
}

const updateScoreBox = async (updateScoreBoxData: UpdateScoreBoxData) => {
  return await fetchApi(`${SCORE_API_URL}/api/member/box/modify`, { session: getSession(), ...updateScoreBoxData })
}

export const useUpdateScoreBox = () => {
  return useMutation({
    mutationFn: async (updateScoreBoxData: UpdateScoreBoxData) => await updateScoreBox(updateScoreBoxData),
  })
}
