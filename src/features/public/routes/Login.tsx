import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import { Layout } from '../components/Layout'

type LoginInput = {
  userId: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()
  const { login, isLoggingIn: isLoading } = useAuth()
  return (
    <Layout>
      <h2>ログイン</h2>
      <Form<LoginInput>
        onSubmit={async (values) => {
          await login(values)
          navigate('/')
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="ユーザー名"
              registration={register('userId')}
              error={formState.errors['userId']}
            />
            <Input
              type="password"
              label="パスワード"
              registration={register('password')}
              error={formState.errors['password']}
            />
            <Button type="submit" isLoading={isLoading}>
              ログイン
            </Button>
          </>
        )}
      </Form>
    </Layout>
  )
}
