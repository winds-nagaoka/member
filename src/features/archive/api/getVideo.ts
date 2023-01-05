import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import type { Video } from '../../../types/video'
import { getSession } from '../../../utilities/session'

const getVideo = async (concertId: string): Promise<Video> => {
  return await fetchApi(`${APP_API_URL}/api/video`, { session: getSession(), id: concertId })
}

export const useVideo = (concertId: string) => {
  return useQuery({
    queryKey: ['video', concertId],
    queryFn: async () => await getVideo(concertId),
  })
}
