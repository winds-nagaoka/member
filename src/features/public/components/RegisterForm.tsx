import { Link } from 'react-router-dom'
import z from 'zod'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import styles from './RegisterForm.module.scss'

const validationScheme = z.object({
  passKey: z.string().min(1, '入力してください'),
  userId: z.string().min(1, '入力してください'),
  password: z.string().min(1, '入力してください'),
})

type RegisterInput = {
  passKey: string
  userId: string
  password: string
}

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { register, isLoggingIn: isLoading } = useAuth()

  return (
    <>
      <h2>新規登録</h2>
      <Form<RegisterInput>
        onSubmit={async (values) => {
          await register(values)
          onSuccess()
        }}
        validationScheme={validationScheme}
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
            <Input
              type="password"
              label="パスワード"
              registration={register('password')}
              error={formState.errors['password']}
            />
            <div className={styles.links}>
              <div className={styles.link}>
                <Link to="/login">ログインはこちら</Link>
              </div>
              <div className={styles.button}>
                <Button type="submit" isLoading={isLoading}>
                  登録
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
