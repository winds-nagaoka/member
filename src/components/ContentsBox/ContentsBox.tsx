import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useStyle } from '../../utilities/useStyle'
import styles from './ContentsBox.module.scss'

export const ContentsBox = ({ children, withLabel }: { children: ReactNode; withLabel?: boolean }) => {
  const pc = useStyle()
  return <div className={clsx(styles.box, styles[pc], { [styles['no-margin-top']]: withLabel })}>{children}</div>
}
