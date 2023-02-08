import { useState } from 'react'
import clsx from 'clsx'
import { Link, useMatch } from 'react-router-dom'
import { useStyle } from '../../utilities/useStyle'
import styles from './Header.module.scss'
import { ReactComponent as WindsLogo } from '../../assets/logo.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'
import { ReactComponent as BackIcon } from '../../assets/left.svg'
import { MenuContents } from './MenuContents'

type PreviousPage = {
  isMatch: boolean
  path: string
}

export const Header = () => {
  const pc = useStyle()
  const [menuOpen, setMenuOpen] = useState(false)

  const PREVIOUS_PAGE_MAP: PreviousPage[] = [
    { isMatch: !!useMatch('/practice'), path: '/' },
    { isMatch: !!useMatch('/practice/source'), path: '/practice' },
    { isMatch: !!useMatch('/practice/history'), path: '/practice' },
    { isMatch: !!useMatch('/manager'), path: '/' },
    { isMatch: !!useMatch('/bbs'), path: '/' },
    { isMatch: !!useMatch('/bbs/post'), path: '/bbs' },
    { isMatch: !!useMatch('/archive'), path: '/' },
    { isMatch: !!useMatch('/archive/overview/:concertId'), path: '/archive' },
    {
      isMatch: !!useMatch('/archive/photo/:concertId'),
      path: '/archive/overview/' + useMatch('/archive/photo/:concertId')?.params.concertId,
    },
    {
      isMatch: !!useMatch('/archive/video/:concertId'),
      path: '/archive/overview/' + useMatch('/archive/video/:concertId')?.params.concertId,
    },
    { isMatch: !!useMatch('/score'), path: '/' },
    { isMatch: !!useMatch('/score/detail/:id'), path: '/score' },
    { isMatch: !!useMatch('/score/box'), path: '/score' },
    { isMatch: !!useMatch('/setting'), path: '/' },
    { isMatch: !!useMatch('/setting/name'), path: '/setting' },
    { isMatch: !!useMatch('/setting/email'), path: '/setting' },
    { isMatch: !!useMatch('/setting/valid/:key'), path: '/setting' },
    { isMatch: !!useMatch('/setting/password'), path: '/setting' },
    { isMatch: !!useMatch('/setting/session'), path: '/setting' },
    { isMatch: !!useMatch('/setting/admin'), path: '/setting' },
    { isMatch: !!useMatch('/setting/delete'), path: '/setting' },
    { isMatch: !!useMatch('/setting/score/mail'), path: '/setting' },
    { isMatch: !!useMatch('/setting/score/admin'), path: '/setting' },
    { isMatch: !!useMatch('/setting/terms'), path: '/setting' },
    { isMatch: !!useMatch('/setting/about'), path: '/setting' },
    { isMatch: !!useMatch('/setting/license'), path: '/setting' },
  ]
  const previousPage = PREVIOUS_PAGE_MAP.find((value) => value.isMatch) ?? null

  return (
    <div className={styles['navigation-header']}>
      <div className={clsx(styles.header, styles[pc])}>
        <div className={styles.logo}>
          <WindsLogo />
        </div>
        <LeftNavigations previousPage={previousPage} onMenuOpen={() => setMenuOpen(true)} />
        <RightNavigations />
      </div>
      <div
        className={clsx(styles['menu-background'], { [styles.open]: menuOpen })}
        onClick={() => setMenuOpen(false)}
      ></div>
      <div className={clsx(styles['menu-content'], { [styles.open]: menuOpen })}>
        <MenuContents onMenuClose={() => setMenuOpen(false)} />
      </div>
    </div>
  )
}

const LeftNavigations = ({
  previousPage,
  onMenuOpen,
}: {
  previousPage: PreviousPage | null
  onMenuOpen: () => void
}) => {
  const pc = useStyle()

  return (
    <>
      {pc === 'mobile' && previousPage && (
        <>
          <div className={clsx(styles.label, styles.back)}>
            <Link to={previousPage.path}>
              <div className={styles['back-icon']}>
                <BackIcon />
              </div>
              <span>戻る</span>
            </Link>
          </div>
        </>
      )}
      {pc === 'mobile' && !previousPage && (
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
