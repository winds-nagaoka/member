import { useState } from 'react'
import { ContentsBox, ContentsLoading, Text } from '../../../components/ContentsBox'
import { useApiKey } from '../api/getApiKey'
import { Post, usePostList } from '../api/getPostList'
import { ReactComponent as PlusIcon } from '../../../assets/plus.svg'
import styles from './PostList.module.scss'

export const PostList = () => {
  const apiKeyQuery = useApiKey()

  if (apiKeyQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!apiKeyQuery.data) {
    return null
  }

  return <PostListContents apiKey={apiKeyQuery.data.api} />
}

const PostListContents = ({ apiKey }: { apiKey: string }) => {
  const postListQuery = usePostList({ apiKey })

  if (postListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!postListQuery.data) {
    return null
  }

  return <PostListDetail postList={postListQuery.data.list} />
}

const MORE_COUNT = 5
const PostListDetail = ({ postList }: { postList: Post[] }) => {
  const [showPostCount, setShowPostCount] = useState(postList.length > MORE_COUNT ? MORE_COUNT : postList.length)
  return (
    <ContentsBox>
      <Text>
        <div className={styles['bbs-list']}>
          {postList.map((post, index) => {
            if (index >= showPostCount) {
              return null
            }
            const text = post.text
              .replace(/(<br>|<br \/>)/gi, '\n')
              .replace(/&gt;/gi, '>')
              .replace(/&lt;/gi, '<')
            return (
              <div key={`bbs-${post.number}`} className={styles['bbs-item']}>
                <div className={styles['bbs-title']}>
                  <span className={styles.number}>{post.number}</span>
                  <span className={styles.name}>{post.name}</span>
                  <span className={styles.time}>{post.time}</span>
                </div>
                <div className={styles['bbs-text']}>
                  {text.split('\n').map((line, lineCount) => {
                    return <p key={`text-${post.number}-${lineCount}`}>{line}</p>
                  })}
                </div>
              </div>
            )
          })}
          {showPostCount < postList.length && (
            <div onClick={() => setShowPostCount(showPostCount + MORE_COUNT)} className={styles.more}>
              <PlusIcon />
              More
            </div>
          )}
        </div>
      </Text>
    </ContentsBox>
  )
}
