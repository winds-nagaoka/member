import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useStyle } from '../../utilities/useStyle'
import styles from './TitleFrame.module.scss'

export const TitleFrame = ({
  title,
  borderBottom,
  children,
}: {
  title?: string | ReactNode
  borderBottom?: boolean
  children: ReactNode
}) => {
  const pc = useStyle()
  return (
    <div className={clsx(styles['title-frame'], { [styles['border-bottom']]: borderBottom }, styles[pc])}>
      {title && <label className={styles[pc]}>{title}</label>}
      {children}
    </div>
  )
}
