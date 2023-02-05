import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { API_PATH } from '../../../config'
import { fetchApiWithFormData } from '../../../library/fetch'
import { queryClient } from '../../../library/queryClient'
import { getPresentTimeString } from '../../../utilities/date'
import type { PostListResponse } from './getPostList'

type CreatePostData = {
  api: string
  name: string
  text: string
  pass: string
}

const createPost = async ({ api, name, text, pass }: CreatePostData) => {
  return await fetchApiWithFormData(`${API_PATH}/bbs/`, { api, write: true, name, text, delpass: pass })
}

export const useCreatePost = () => {
  const navigate = useNavigate()

  return useMutation({
    onMutate: async (createPostData: CreatePostData) => {
      await queryClient.cancelQueries(['bbsPostList'])
      const previousPostList = queryClient.getQueryData<PostListResponse>(['bbsPostList'])
      const expectNewPost = {
        number: String((previousPostList?.list.length || 0) + 1),
        edit: false,
        name: createPostData.name,
        text: createPostData.text,
        time: getPresentTimeString(),
      }
      console.log({ expectNewPost })
      queryClient.setQueryData(['bbsPostList'], {
        ...previousPostList,
        list: [expectNewPost, ...(previousPostList?.list || [])],
      })
      return { previousPostList }
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bbsPostList'])
      navigate('/bbs')
    },
    mutationFn: async (createPostData: CreatePostData) => await createPost(createPostData),
  })
}
