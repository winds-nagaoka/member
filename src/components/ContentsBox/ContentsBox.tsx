import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useStyle } from '../../utilities/useStyle'
import styles from './ContentsBox.module.scss'

export const ContentsBox = ({ children }: { children: ReactNode }) => {
  const pc = useStyle()
  return <div className={clsx(styles.box, styles[pc])}>{children}</div>
}
