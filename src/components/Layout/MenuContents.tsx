import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { ReactComponent as Logo } from '../../assets/hr.svg'
import styles from './MenuContents.module.scss'
import { useStyle } from '../../utilities/useStyle'

const menuList = [
  { label: 'ホーム', path: '/' },
  { label: '練習について', path: '/practice' },
  { label: 'お知らせ', path: '/manager' },
  { label: '掲示板', path: '/bbs' },
  { label: 'アーカイブ', path: '/archive' },
  { label: 'ウィンズスコア', path: '/score' },
  { label: '設定', path: '/setting' },
]

export const MenuContents = ({ onMenuClose }: { onMenuClose?: () => void }) => {
  const pc = useStyle()
  return (
    <div className={clsx(styles['navigation-menu-contents'], styles[pc])}>
      <div className={styles['app-info']}>
        <div className={styles.light}>
          <Logo />
        </div>
        <img src="https://winds-n.com/image/icon/apple-icon.png" alt="logo" className={styles.dark} />
        <span>会員専用ページ</span>
      </div>
      <ol>
        {menuList.map((menuItem) => {
          return (
            <li key={menuItem.path}>
              <CustomLink to={menuItem.path} label={menuItem.label} onClick={onMenuClose} />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const CustomLink = ({ label, to, onClick }: { label: string; to: string; onClick?: () => void }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => (isActive ? clsx(styles.link, styles.active) : styles.link)}
    >
      <div>{label}</div>
    </NavLink>
  )
}
