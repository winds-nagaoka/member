import clsx from 'clsx'
import { z } from 'zod'
import { confirmAlert } from 'react-confirm-alert'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import { ContentsButton, ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useAuth } from '../../../library/auth'
import { useStyle } from '../../../utilities/useStyle'
import { useUpdateAdmin } from '../api/updateAdmin'
import { Alert } from '../../../components/Alert/Alert'
import styles from './ChangeAdmin.module.scss'

type ChangeAdminInput = {
  password: string
}

const validationScheme = z.object({
  password: z.string().min(1, '入力してください'),
})

export const ChangeAdmin = () => {
  const pc = useStyle()
  const updateAdminMutation = useUpdateAdmin()

  const { user } = useAuth()
  if (!user) {
    return null
  }

  if (user.admin) {
    const onClickHandler = () => {
      confirmAlert({
        customUI: ({ onClose }) => (
          <Alert
            title="管理者を辞めますか？"
            message="改めて管理者になるにはパスワードの再入力が必要です"
            onConfirm={() => updateAdminMutation.mutate({ admin: false, password: '' })}
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

  const onSubmit = (value: ChangeAdminInput) => updateAdminMutation.mutate({ admin: true, ...value })

  return (
    <Form<ChangeAdminInput> onSubmit={onSubmit} validationScheme={validationScheme}>
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
