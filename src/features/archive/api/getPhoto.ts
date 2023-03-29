import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import type { Photo } from '../../../types/photo'
import { getSession } from '../../../utilities/session'

const getPhoto = async (concertId: string): Promise<Photo> => {
  return await fetchApi(`${APP_API_URL}/api/photo`, { session: getSession(), id: concertId })
}

export const usePhoto = (concertId: string) => {
  return useQuery({
    queryKey: ['photo', concertId],
    queryFn: async () => await getPhoto(concertId),
  })
}
