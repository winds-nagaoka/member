import type { ReactNode } from 'react'
import { useStyle } from '../../utilities/useStyle'
import { Header } from './Header'
import clsx from 'clsx'

import styles from './Layout.module.scss'
import { MenuContents } from './MenuContents'

export const Layout = ({ children }: { children: ReactNode }) => {
  const pc = useStyle()
  return (
    <div className={styles.auth}>
      <Header />
      <div className={clsx(styles.contents, styles[pc])}>
        <div className={clsx(styles['contents-inner'], styles[pc])}>
          <div className={clsx({ [styles['flex-frame']]: pc === 'pc' })}>
            <NavigationInline />
            <div className={styles[pc === 'pc' ? 'inline-contents' : 'full-contents']}>{children}</div>
          </div>
          <footer>
            <small>&copy; The Wind Ensemble</small>
          </footer>
        </div>
      </div>
    </div>
  )
}

const NavigationInline = () => {
  const pc = useStyle()
  if (pc === 'mobile') {
    return null
  }
  return (
    <div className={styles['menu-contents-inline']}>
      <MenuContents />
    </div>
  )
}
