import { useQuery } from 'react-query'
import { SCORE_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import type { BoxItem, ScoreItem, EditMode } from '../../../types'
import { getSession } from '../../../utilities/session'

export type PreEditApi = {
  status: boolean
  boxList: BoxItem[]
  data?: ScoreItem
  latest?: ScoreItem
}

const getPreEdit = async (mode: EditMode | null, id: string | false): Promise<PreEditApi> => {
  return await fetchApi(`${SCORE_API_URL}/api/member/edit/pre`, { session: getSession(), mode, id })
}

export const usePreEdit = (mode: EditMode | null, id: string | false) => {
  return useQuery({
    queryKey: ['preEdit', mode, id],
    queryFn: async () => await getPreEdit(mode, id),
  })
}
