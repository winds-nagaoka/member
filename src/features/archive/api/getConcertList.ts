import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { MainConcert, MiniConcert, OtherConcert } from '../../../types'
import { getSession } from '../../../utilities/session'

type ConcertListApi = {
  status: boolean
  list: {
    id: string
    time: number
    type: 'main' | 'mini' | 'other'
    detail: MainConcert | MiniConcert | OtherConcert
    _id: string
  }[]
}

const getConcertList = async (): Promise<ConcertListApi> => {
  return await fetchApi(`${APP_API_URL}/api/concert`, { session: getSession() })
}

export const useConcertList = () => {
  return useQuery({
    queryKey: 'archiveList',
    queryFn: () => getConcertList(),
  })
}
