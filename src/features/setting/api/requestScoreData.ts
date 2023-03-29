import { useMutation } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

const requestScoreData = async () => {
  return await fetchApi(`${SCORE_API_URL}/api/member/sendmail`, { session: getSession() })
}

export const useRequestScoreData = () => {
  return useMutation({
    mutationFn: async () => await requestScoreData(),
  })
}
