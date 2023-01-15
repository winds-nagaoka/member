import clsx from 'clsx'
import type { ScoreItem } from '../../../types'
import { useInputList } from '../api/getInput'
import styles from './Input.module.scss'

export const Input = ({
  label,
  value,
  target,
  inputClassName,
  multi,
  onChange,
}: {
  label: string
  value: string
  target: keyof ScoreItem
  inputClassName: string
  multi?: boolean
  onChange: (value: string) => void
}) => {
  return (
    <div className={clsx(styles.input, { [styles.multi]: multi })}>
      <label>{label}</label>
      <input type="text" className={inputClassName} value={value} onChange={(e) => onChange(e.target.value)} />
      {value && <AutoCorrect target={target} value={value} onChange={onChange} />}
    </div>
  )
}

const AutoCorrect = ({
  target,
  value,
  onChange,
}: {
  target: keyof ScoreItem
  value: string
  onChange: (value: string) => void
}) => {
  const inputListQuery = useInputList(target, value)

  if (inputListQuery.isLoading || !inputListQuery.data) {
    return null
  }

  const autoCorrectList = inputListQuery.data.list.reduce((previous, current) => {
    const currentValue = current[target]
    if (Array.isArray(currentValue)) {
      return [...previous, ...currentValue.filter((cur) => !previous.includes(cur))]
    } else {
      return !previous.includes(currentValue) ? [...previous, currentValue] : previous
    }
  }, [] as string[])

  if (autoCorrectList.includes(value)) {
    return null
  }

  return (
    <>
      {autoCorrectList.map((autoCorrect, index) => (
        <div key={`${target}-${index}`} onClick={() => onChange(autoCorrect)} className={styles['auto-correct']}>
          {autoCorrect}
        </div>
      ))}
    </>
  )
}
