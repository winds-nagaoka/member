import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import styles from './Input.module.scss'

type FormInfo = {
  label: string
  error?: FieldError
}

type InputProps = FormInfo & {
  type: 'text' | 'password'
  registration: Partial<UseFormRegisterReturn>
}

export const Input = ({ type, registration, label, error }: InputProps) => {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input type={type} {...registration} />
      {error?.message && <div>{error.message}</div>}
    </div>
  )
}
