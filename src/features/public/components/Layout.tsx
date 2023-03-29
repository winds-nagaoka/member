import { ReactNode } from 'react'
import clsx from 'clsx'

import { ReactComponent as WindsLogo } from '../../../assets/logo.svg'
import styles from './Layout.module.scss'
import { useStyle } from '../../../utilities/useStyle'

export const Layout = ({ children }: { children: ReactNode }) => {
  const pc = useStyle()
  return (
    <>
      <Header />
      <div className={clsx(styles.contents, styles[pc])}>
        <div className={clsx(styles['form-base'], styles[pc])}>
          <div className={clsx(styles.form, styles[pc])}>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}

const Header = () => {
  const pc = useStyle()
  return (
    <div className={styles['navigation-header']}>
      <div className={clsx(styles.header, styles[pc])}>
        <div className={styles.logo}>
          <a href="https://winds-n.com">
            <WindsLogo />
          </a>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <small>
        &copy;&nbsp;<a href="https://winds-n.com">The Wind Ensemble</a>
      </small>
    </footer>
  )
}
