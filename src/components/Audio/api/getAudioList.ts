import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

type AudioArchive = {
  id: string
  time: number
  status: boolean
  baseSrc: string
  type: 'main'
  list: {
    available: boolean
    data: number
    path: string
    addtitle?: string
  }[]
  _id: 'ddeOCFCgEjPr3bC1'
}

type AudioList = {
  status: true
  list: AudioArchive[]
  url: string
}

const getAudioList = async (): Promise<AudioList> => {
  return await fetchApi(`${APP_API_URL}/api/audio`, { session: getSession() })
}

export const useAudioList = () => {
  return useQuery({
    queryKey: 'audioList',
    queryFn: async () => await getAudioList(),
  })
}
