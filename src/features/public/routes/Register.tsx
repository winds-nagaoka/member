import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import { Layout } from '../components/Layout'

type RegisterInput = {
  passKey: string
  userId: string
  password: string
}

export const Register = () => {
  const navigate = useNavigate()
  const { register, isLoggingIn: isLoading } = useAuth()
  return (
    <Layout>
      <h2>新規登録</h2>
      <Form<RegisterInput>
        onSubmit={async (values) => {
          await register(values)
          navigate('/')
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="会員専用パスワード"
              registration={register('passKey')}
              error={formState.errors['passKey']}
            />
            <Input
              type="text"
              label="ユーザー名"
              registration={register('userId')}
              error={formState.errors['userId']}
            />
            <Input type="password" label="パスワード" registration={register('password')} />
            <Button type="submit" isLoading={isLoading}>
              登録
            </Button>
          </>
        )}
      </Form>
    </Layout>
  )
}
