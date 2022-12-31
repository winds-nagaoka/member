import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'

type RegisterInput = {
  passkey: string
  userId: string
  password: string
}

export const Register = () => {
  const navigate = useNavigate()
  const { register, isLoggingIn: isLoading } = useAuth()
  return (
    <>
      <h2>Register</h2>
      <Form<RegisterInput>
        onSubmit={async (values) => {
          await register(values)
          navigate('/')
        }}
      >
        {({ register, formState }) => (
          <>
            <Input type="text" label="passkey" registration={register('passkey')} error={formState.errors['passkey']} />
            <Input type="text" label="userid" registration={register('userId')} error={formState.errors['userId']} />
            <Input type="password" label="password" registration={register('password')} />
            <Button type="submit" isLoading={isLoading}>
              登録
            </Button>
          </>
        )}
      </Form>
    </>
  )
}
