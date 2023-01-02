import { useStyle } from '../../utilities/useStyle'
import styles from './Header.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { ReactComponent as WindsLogo } from '../../assets/logo.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'
import { ReactComponent as BackIcon } from '../../assets/left.svg'

export const Header = () => {
  const pc = useStyle()
  const navigationMenuToggle = () => {
    console.log('メニューを開く')
  }
  const hasPreviousPage = false
  const menuOpen = false
  return (
    <div className={styles['navigation-header']}>
      <div className={clsx(styles.header, styles[pc])}>
        <div className={styles.logo}>
          <WindsLogo />
        </div>
        <LeftNavigations hasPreviousPage={hasPreviousPage} navigationMenuToggle={navigationMenuToggle} />
        <RightNavigations />
      </div>
      <div className={'menu-background' + (menuOpen ? ' open' : '')} onClick={navigationMenuToggle}></div>
      <div className={'menu-content' + (menuOpen ? ' open' : '')}>ここにメニュー</div>
    </div>
  )
}

const LeftNavigations = ({
  hasPreviousPage,
  navigationMenuToggle,
}: {
  hasPreviousPage: boolean
  navigationMenuToggle: () => void
}) => {
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
        <div className={styles.label} onClick={() => navigationMenuToggle()}>
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
