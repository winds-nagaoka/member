import { Link } from 'react-router-dom'
import { ReactComponent as RightIcon } from '../../assets/right.svg'
import styles from './ContentsLinks.module.scss'

type LinkItem = { path: string; label: string; isDisabled?: boolean }

export const ContentsLinks = ({ list }: { list: LinkItem[] }) => {
  return (
    <div className={styles.link}>
      <ul>
        {list.map((link) => (
          <li key={link.path}>
            {link.isDisabled && (
              <div className={styles['disabled-link']}>
                <div className={styles.inner}>
                  <span>{link.label}</span>
                  <RightIcon />
                </div>
              </div>
            )}
            {!link.isDisabled && (
              <Link to={link.path}>
                <div className={styles.inner}>
                  <span>{link.label}</span>
                  <RightIcon />
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
