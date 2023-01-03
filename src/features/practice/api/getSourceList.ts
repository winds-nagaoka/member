import { useQuery } from 'react-query'
import { getSession } from '../../../utilities/session'
import { fetchApi } from '../../../library/fetch'
import { APP_API_URL } from '../../../config'

type Source = {
  id: string
  time: number
  detail: {
    id: string
    title: string
    type: 'source'
    time: { timestamp: number; date: string; time: string }
    sourceStatus: true
    contents: { label: string; music: number[] }[]
    data: {
      audio?: number
      title: string
      composer?: string
      arranger?: string
      movement?: string[]
      addtitle?: string[]
    }[]
  }
  _id: string
}

export type SourceListApi = { status: boolean; list: Source[] }

const getSourceList = async (): Promise<SourceListApi> => {
  return await fetchApi(`${APP_API_URL}/api/source`, { session: getSession() })
}

export const useSourceList = () => {
  return useQuery({
    queryKey: 'sourceList',
    queryFn: () => getSourceList(),
  })
}
