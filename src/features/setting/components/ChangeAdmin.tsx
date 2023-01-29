import clsx from 'clsx'
import { z } from 'zod'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import { ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useStyle } from '../../../utilities/useStyle'
import styles from './ChangeAdmin.module.scss'

type ChangeAdminInput = {
  password: string
}

const validationScheme = z.object({
  password: z.string().min(1, '入力してください'),
})

export const ChangeAdmin = () => {
  const pc = useStyle()
  const onSubmit = () => console.log('onSubmit')

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
