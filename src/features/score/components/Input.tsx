import clsx from 'clsx'
import { ChangeEvent } from 'react'
import styles from './Input.module.scss'

export const Input = ({
  label,
  value,
  inputClassName,
  multi,
  onChange,
}: {
  label: string
  value: string
  inputClassName: string
  multi?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className={clsx(styles.input, { [styles.multi]: multi })}>
      <label>{label}</label>
      <input type="text" className={inputClassName} value={value} onChange={onChange} />
      {/* {autoCorrect} */}
    </div>
  )
}
