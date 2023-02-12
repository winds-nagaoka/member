import { Link } from 'react-router-dom'
import z from 'zod'
import { Button, Form, Input } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import { useStyle } from '../../../utilities/useStyle'
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
  const pc = useStyle()
  const { register, isLoggingIn: isLoading } = useAuth()

  return (
    <div className={styles.form}>
      <h2 className={styles[pc]}>新規登録</h2>
      <div className={styles.text}>共通パスワードを入力してください</div>
      <Form<RegisterInput>
        onSubmit={async (values) => {
          const user = await register(values)
          user && onSuccess()
        }}
        validationScheme={validationScheme}
      >
        {({ register, formState }) => {
          const hasError = !formState.isValid
          return (
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
                  <Button type="submit" isLoading={isLoading} disabled={hasError}>
                    登録
                  </Button>
                </div>
              </div>
            </>
          )
        }}
      </Form>
    </div>
  )
}
