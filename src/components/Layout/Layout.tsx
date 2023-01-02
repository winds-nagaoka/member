import type { ReactNode } from 'react'
import { useStyle } from '../../utilities/useStyle'
import { Header } from './Header'

import styles from './Layout.module.scss'

export const Layout = ({ children }: { children: ReactNode }) => {
  const pc = useStyle()
  return (
    <div className={styles.auth}>
      <Header />
      <div className={styles.contents}>
        <div className={styles['contents-inner']}>
          <div className={styles['flex-frame']}>
            <div className={styles[pc === 'pc' ? 'inline-contents' : 'full-contents']}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
