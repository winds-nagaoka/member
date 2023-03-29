import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useStyle } from '../../utilities/useStyle'
import styles from './Text.module.scss'

export const Text = ({ children }: { children: ReactNode }) => {
  const pc = useStyle()
  return <div className={clsx(styles.text, styles[pc])}>{children}</div>
}
