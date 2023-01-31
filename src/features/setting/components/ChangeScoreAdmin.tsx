import clsx from 'clsx'
import { z } from 'zod'
import { confirmAlert } from 'react-confirm-alert'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import styles from './ChangeScoreAdmin.module.scss'
import { useStyle } from '../../../utilities/useStyle'
import { ContentsButton, ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useUpdateScoreAdmin } from '../api/updateScoreAdmin'
import { useAuth } from '../../../library/auth'
import { Alert } from '../../../components/Alert/Alert'

type ChangeScoreAdminInput = {
  password: string
}

const validationScheme = z.object({
  password: z.string().min(1, '入力してください'),
})

export const ChangeScoreAdmin = () => {
  const pc = useStyle()
  const updateScoreAdminMutation = useUpdateScoreAdmin()

  const { user } = useAuth()
  if (!user) {
    return null
  }

  if (user.scoreAdmin) {
    const onClickHandler = () => {
      confirmAlert({
        customUI: ({ onClose }) => (
          <Alert
            title="楽譜管理者を辞めますか？"
            message="改めて楽譜管理者になるにはパスワードの再入力が必要です"
            onConfirm={() => updateScoreAdminMutation.mutate({ admin: false, password: '' })}
            confirmButtonLabel="辞める"
            onClose={onClose}
          />
        ),
      })
    }
    return (
      <ContentsBox>
        <ContentsButton label="管理者を辞める" onClick={onClickHandler} />
      </ContentsBox>
    )
  }

  const onSubmit = (value: ChangeScoreAdminInput) => updateScoreAdminMutation.mutate({ admin: true, ...value })

  return (
    <Form<ChangeScoreAdminInput> onSubmit={onSubmit} validationScheme={validationScheme}>
      {({ register, formState }) => {
        const hasError = !formState.isValid
        return (
          <>
            <ContentsBox>
              <div className={clsx(styles['setting-text'], styles[pc])}>
                <div>
                  <label>管理者パスワード</label>
                  <input type="password" {...register('password')} placeholder="パスワード" />
                </div>
              </div>
            </ContentsBox>
            <ContentsSubmitButton type="submit" label="管理者登録" isDisabled={hasError} />
          </>
        )
      }}
    </Form>
  )
}
