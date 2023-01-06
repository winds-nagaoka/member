import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

export type AudioSource = {
  id: string
  time: number
  status: boolean
  baseSrc: string
  list: {
    available: boolean
    data: number
    path: string
    addtitle?: string
  }[]
  _id: string
}

export type ReferenceListApi = {
  status: true
  list: AudioSource[]
  url: string
}

const getReferenceList = async (): Promise<ReferenceListApi> => {
  return await fetchApi(`${APP_API_URL}/api/reference`, { session: getSession() })
}

export const useReferenceList = () => {
  return useQuery({
    queryKey: 'referenceList',
    queryFn: async () => await getReferenceList(),
  })
}
