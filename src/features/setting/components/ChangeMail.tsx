import { z } from 'zod'
import clsx from 'clsx'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import styles from './ChangeMail.module.scss'
import { ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useStyle } from '../../../utilities/useStyle'

const composeValidationScheme = (defaultMail: string) => {
  return z.object({
    mail: z
      .string()
      .min(1, '入力してください')
      .email('メールアドレスの形式にしてください')
      .refine((value) => value !== defaultMail),
  })
}

type ChangeMailInput = {
  mail: string
}

export const ChangeMail = () => {
  const pc = useStyle()
  const { user } = useAuth()

  const onSubmit = () => console.log('onSubmit')

  const defaultMail = user?.emailAddress ?? ''
  return (
    <Form<ChangeMailInput> onSubmit={onSubmit} validationScheme={composeValidationScheme(defaultMail)}>
      {({ register, formState }) => {
        const hasError = !formState.isValid
        return (
          <>
            <ContentsBox>
              <div className={clsx(styles['setting-text'], styles[pc])}>
                <div>
                  <label>メールアドレス</label>
                  <input type="text" {...register('mail')} placeholder={defaultMail} />
                </div>
              </div>
            </ContentsBox>
            <ContentsSubmitButton type="submit" label="メールアドレスの変更" isDisabled={hasError} />
          </>
        )
      }}
    </Form>
  )
}
