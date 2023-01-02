import { Link } from 'react-router-dom'
import z from 'zod'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import styles from './LoginForm.module.scss'

const validationScheme = z.object({
  userId: z.string().min(1, '入力してください'),
  password: z.string().min(1, '入力してください'),
})

type LoginInput = {
  userId: string
  password: string
}

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { login, isLoggingIn: isLoading } = useAuth()

  return (
    <>
      <h2>ログイン</h2>
      <Form<LoginInput>
        onSubmit={async (values) => {
          const user = await login(values)
          user && onSuccess()
        }}
        validationScheme={validationScheme}
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
            <div className={styles.links}>
              <div className={styles.link}>
                <Link to="/reg">新規登録はこちら</Link>
              </div>
              <div className={styles.button}>
                <Button type="submit" isLoading={isLoading}>
                  ログイン
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
