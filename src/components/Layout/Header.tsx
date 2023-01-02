import { useState } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useStyle } from '../../utilities/useStyle'
import styles from './Header.module.scss'
import { ReactComponent as WindsLogo } from '../../assets/logo.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'
import { ReactComponent as BackIcon } from '../../assets/left.svg'
import { MenuContents } from './MenuContents'

export const Header = () => {
  const pc = useStyle()
  const [menuOpen, setMenuOpen] = useState(false)
  const hasPreviousPage = false
  return (
    <div className={styles['navigation-header']}>
      <div className={clsx(styles.header, styles[pc])}>
        <div className={styles.logo}>
          <WindsLogo />
        </div>
        <LeftNavigations hasPreviousPage={hasPreviousPage} onMenuOpen={() => setMenuOpen(true)} />
        <RightNavigations />
      </div>
      <div
        className={clsx(styles['menu-background'], menuOpen ? styles.open : '')}
        onClick={() => setMenuOpen(false)}
      ></div>
      <div className={clsx(styles['menu-content'], menuOpen ? styles.open : '')}>
        <MenuContents onMenuClose={() => setMenuOpen(false)} />
      </div>
    </div>
  )
}

const LeftNavigations = ({ hasPreviousPage, onMenuOpen }: { hasPreviousPage: boolean; onMenuOpen: () => void }) => {
  const pc = useStyle()

  return (
    <>
      {pc === 'mobile' && hasPreviousPage && (
        <>
          <div className={clsx(styles.label, styles.back)}>
            <Link to="/">
              <div className={styles['back-icon']}>
                <BackIcon />
              </div>
              <span>戻る</span>
            </Link>
          </div>
        </>
      )}
      {pc === 'mobile' && !hasPreviousPage && (
        <div className={styles.label} onClick={onMenuOpen}>
          <MenuIcon />
        </div>
      )}
    </>
  )
}

const RightNavigations = () => {
  const pc = useStyle()

  if (pc === 'pc') {
    return null
  }

  return (
    <div className={clsx(styles.label, styles['home-navigation'])}>
      <Link to="/">
        <HomeIcon />
      </Link>
    </div>
  )
}
