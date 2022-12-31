import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'

type LoginInput = {
  userId: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()
  const { login, isLoggingIn: isLoading } = useAuth()
  return (
    <>
      <h2>Login</h2>
      <Form<LoginInput>
        onSubmit={async (values) => {
          await login(values)
          navigate('/')
        }}
      >
        {({ register, formState }) => (
          <>
            <Input type="text" label="userid" registration={register('userId')} error={formState.errors['userId']} />
            <Input
              type="password"
              label="password"
              registration={register('password')}
              error={formState.errors['password']}
            />
            <Button type="submit" isLoading={isLoading}>
              ログイン
            </Button>
          </>
        )}
      </Form>
    </>
  )
}
