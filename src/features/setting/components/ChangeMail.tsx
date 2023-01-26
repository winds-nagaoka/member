import { z } from 'zod'
import clsx from 'clsx'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import { useAuth } from '../../../library/auth'
import styles from './ChangeMail.module.scss'
import { ContentsButton, ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useStyle } from '../../../utilities/useStyle'
import { useUpdateMail } from '../api/updateMail'
import { useDeleteMail } from '../api/deleteMail'

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
  const updateMailMutation = useUpdateMail()
  const deleteMailMutation = useDeleteMail()

  const onSubmit = (value: ChangeMailInput) => updateMailMutation.mutate({ mail: value.mail })
  const onDeleteMail = () => deleteMailMutation.mutate()

  const defaultMail = user?.email ?? ''

  return (
    <>
      <Form<ChangeMailInput>
        onSubmit={onSubmit}
        validationScheme={composeValidationScheme(defaultMail)}
        options={{ defaultValues: { mail: defaultMail } }}
      >
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
              <ContentsSubmitButton type="submit" label="保存" isDisabled={hasError} />
            </>
          )
        }}
      </Form>
      {user?.email && (
        <ContentsBox>
          <ContentsButton label="メールアドレスの登録を解除" onClick={onDeleteMail} />
        </ContentsBox>
      )}
    </>
  )
}
