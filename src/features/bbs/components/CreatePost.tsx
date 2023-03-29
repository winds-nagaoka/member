import clsx from 'clsx'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { Form, Input, Textarea } from '../../../components/Form'
import { ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useNotificationStore } from '../../../stores/notification'
import { useStyle } from '../../../utilities/useStyle'
import { useCreatePost } from '../api/createPost'
import { useApiKey } from '../api/getApiKey'
import styles from './CreatePost.module.scss'

export const CreatePost = () => {
  const apiKeyQuery = useApiKey()

  if (apiKeyQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!apiKeyQuery.data) {
    return null
  }
  return <PostForm apiKey={apiKeyQuery.data.api} />
}

type PostInput = {
  name: string
  text: string
  pass: string
}

const PostForm = ({ apiKey }: { apiKey: string }) => {
  const pc = useStyle()
  const createPostMutation = useCreatePost()
  const { addNotification } = useNotificationStore()

  const onSubmit = (value: PostInput) => {
    if (value.name === '' || value.text === '') {
      return addNotification('入力内容を確認してください')
    }
    createPostMutation.mutate({ api: apiKey, ...value })
  }

  return (
    <Form<PostInput> onSubmit={onSubmit}>
      {({ register }) => (
        <>
          <ContentsBox>
            <div className={clsx(styles['post-form'], styles[pc])}>
              <Input type="text" label="名前" registration={register('name')} />
              <Textarea label="コメント" registration={register('text')} />
              <Input type="password" label="編集パス" registration={register('pass')} />
            </div>
          </ContentsBox>
          <ContentsSubmitButton type="submit" label="書き込む" />
        </>
      )}
    </Form>
  )
}
