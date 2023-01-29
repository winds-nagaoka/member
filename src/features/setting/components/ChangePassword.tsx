import clsx from 'clsx'
import { Form } from '../../../components/Form'
import { ContentsBox } from '../../../components/ContentsBox'
import styles from './ChangePassword.module.scss'
import { useStyle } from '../../../utilities/useStyle'
import { ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'

type ChangePasswordInput = {
  oldPassword: string
  newPassword: string
}

export const ChangePassword = () => {
  const pc = useStyle()

  return (
    <>
      <Form<ChangePasswordInput> onSubmit={() => console.log('onSubmit')}>
        {({ register, formState }) => {
          const hasError = !formState.isValid
          return (
            <>
              <ContentsBox>
                <div className={clsx(styles['setting-text'], styles[pc])}>
                  <div>
                    <label>古いパスワード</label>
                    <input type="password" {...register('oldPassword')} />
                  </div>
                  <div>
                    <label>新しいパスワード</label>
                    <input type="password" {...register('newPassword')} />
                  </div>
                </div>
              </ContentsBox>
              <ContentsSubmitButton type="submit" label="送信" isDisabled={hasError} />
            </>
          )
        }}
      </Form>
    </>
  )
}
