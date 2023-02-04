import { useQuery } from 'react-query'
import { API_PATH } from '../../../config'
import { fetchApiWithFormData } from '../../../library/fetch'

type PostListData = {
  apiKey: string
}

const getPostList = async ({ apiKey }: PostListData) => {
  return await fetchApiWithFormData<{ api: string }>(`${API_PATH}/bbs/`, { api: apiKey })
}

export const usePostList = (postListData: PostListData) => {
  return useQuery({
    queryKey: ['bbsPostList'],
    queryFn: async () => await getPostList(postListData),
  })
}
