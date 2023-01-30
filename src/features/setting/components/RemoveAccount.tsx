import clsx from 'clsx'
import { z } from 'zod'
import { confirmAlert } from 'react-confirm-alert'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import { ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useStyle } from '../../../utilities/useStyle'
import { useDeleteAccount } from '../api/deleteAccount'
import styles from './RemoveAccount.module.scss'
import { Alert } from '../../../components/Alert/Alert'

type RemoveAccountInput = {
  password: string
}

const validationScheme = z.object({
  password: z.string().min(1, '入力してください'),
})

export const RemoveAccount = () => {
  const pc = useStyle()
  const deleteAccountMutation = useDeleteAccount()

  const onSubmit = (value: RemoveAccountInput) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <Alert
          title="アカウントを削除しますか？"
          message="ユーザー情報は完全に削除されます。"
          onConfirm={() => deleteAccountMutation.mutate(value)}
          confirmButtonLabel="削除"
          onClose={onClose}
        />
      ),
    })
  }

  return (
    <>
      <Form<RemoveAccountInput> onSubmit={onSubmit} validationScheme={validationScheme}>
        {({ register, formState }) => {
          const hasError = !formState.isValid
          return (
            <>
              <ContentsBox>
                <div className={clsx(styles['setting-text'], styles[pc])}>
                  <div>
                    <label>パスワード</label>
                    <input type="password" {...register('password')} />
                  </div>
                </div>
              </ContentsBox>
              <ContentsSubmitButton type="submit" label="削除" isDisabled={hasError} />
            </>
          )
        }}
      </Form>
    </>
  )
}
