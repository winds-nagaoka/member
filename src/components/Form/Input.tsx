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
      {error?.message && <div className={styles.error}>{error.message}</div>}
    </div>
  )
}

type TextareaProps = FormInfo & {
  registration: Partial<UseFormRegisterReturn>
}

export const Textarea = ({ registration, label, error }: TextareaProps) => {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <textarea {...registration} />
      {error?.message && <div className={styles.error}>{error.message}</div>}
    </div>
  )
}
