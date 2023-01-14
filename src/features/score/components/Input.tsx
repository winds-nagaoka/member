import { ChangeEvent } from 'react'

export const Input = ({
  label,
  target,
  inputClass,
  onChange,
}: {
  label: string
  target: string
  inputClass: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return <input />
}
