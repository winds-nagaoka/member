import { ContentsLoading } from '../../../components/ContentsBox'
import { useApiKey } from '../api/getApiKey'
import { usePostList } from '../api/getPostList'

export const PostList = () => {
  const apiKeyQuery = useApiKey()

  if (apiKeyQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!apiKeyQuery.data) {
    return null
  }

  return <PostListDetail apiKey={apiKeyQuery.data.api} />
}

const PostListDetail = ({ apiKey }: { apiKey: string }) => {
  const postListQuery = usePostList({ apiKey })

  if (postListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!postListQuery.data) {
    return null
  }

  return <>bbs post</>
}
