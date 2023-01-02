import { Link } from 'react-router-dom'
import { ReactComponent as RightIcon } from '../../assets/right.svg'
import styles from './ContentsLinks.module.scss'

type LinkItem = { path: string; label: string }

export const ContentsLinks = ({ list }: { list: LinkItem[] }) => {
  return (
    <div className={styles.link}>
      <ul>
        {list.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>
              <div className={styles.inner}>
                <span>{link.label}</span>
                <RightIcon />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
