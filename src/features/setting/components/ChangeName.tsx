import clsx from 'clsx'
import { z } from 'zod'
import { ContentsBox } from '../../../components/ContentsBox'
import { Form } from '../../../components/Form'
import { ContentsSubmitButton } from '../../../components/Navigations/ContentsButton'
import { useAuth } from '../../../library/auth'
import { useStyle } from '../../../utilities/useStyle'
import styles from './ChangeName.module.scss'

const composeValidationScheme = (defaultUserName: string) => {
  return z.object({
    name: z
      .string()
      .min(1, '入力してください')
      .refine((value) => value !== defaultUserName),
  })
}

type ChangeNameInput = {
  name: string
}

export const ChangeName = () => {
  const pc = useStyle()
  const { user } = useAuth()

  const onSubmit = (value: any) => console.log(value)

  const defaultUsername = user?.name ?? ''

  return (
    <>
      <Form<ChangeNameInput>
        onSubmit={onSubmit}
        validationScheme={composeValidationScheme(defaultUsername)}
        options={{ defaultValues: { name: defaultUsername } }}
      >
        {({ register, formState }) => {
          const hasError = !formState.isValid
          return (
            <>
              <ContentsBox>
                <div className={clsx(styles['setting-text'], styles[pc])}>
                  <div>
                    <label>名前</label>
                    <input type="text" {...register('name')} placeholder={defaultUsername} />
                  </div>
                </div>
              </ContentsBox>
              <ContentsSubmitButton type="submit" label="名前の変更" isDisabled={hasError} />
            </>
          )
        }}
      </Form>
    </>
  )
}
