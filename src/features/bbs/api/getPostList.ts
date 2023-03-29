import { useQuery } from 'react-query'
import { API_PATH } from '../../../config'
import { fetchApiWithFormData } from '../../../library/fetch'

type PostListData = {
  apiKey: string
}

type NumberString = string
type DateString = string // yyyy/MM/dd HH:mm

export type Post = {
  number: NumberString
  edit: boolean
  name: string
  text: string
  time: DateString
}

export type PostListResponse = {
  status: boolean
  list: Post[]
}

const getPostList = async ({ apiKey }: PostListData): Promise<PostListResponse> => {
  return await fetchApiWithFormData<{ api: string }>(`${API_PATH}/bbs/`, { api: apiKey })
}

export const usePostList = (postListData: PostListData) => {
  return useQuery({
    queryKey: ['bbsPostList'],
    queryFn: async () => await getPostList(postListData),
  })
}
