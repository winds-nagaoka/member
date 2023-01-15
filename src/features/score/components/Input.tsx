import { ChangeEvent } from 'react'
import styles from './Input.module.scss'

export const Input = ({
  label,
  value,
  inputClass,
  className,
  onChange,
}: {
  label: string
  value: string
  inputClass?: string
  className?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input type="text" className={inputClass} value={value} onChange={onChange} />
      {/* {autoCorrect} */}
    </div>
  )
}
