import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { ReactComponent as RightIcon } from '../../assets/right.svg'
import { useStyle } from '../../utilities/useStyle'
import styles from './ContentsLinks.module.scss'

type LinkItem = { path?: string; label: string; isDisabled?: boolean; onClick?: () => void }

export const ContentsLinks = ({ list }: { list: LinkItem[] }) => {
  const pc = useStyle()
  return (
    <div className={styles.link}>
      <ul>
        {list.map((link, index) => {
          if (link.path) {
            return (
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
                    <div className={clsx(styles.inner, styles[pc])}>
                      <span>{link.label}</span>
                      <RightIcon />
                    </div>
                  </Link>
                )}
              </li>
            )
          } else {
            return (
              <li key={link.label + index}>
                <div className={styles['link-button']} onClick={link.onClick}>
                  <div className={styles.inner}>
                    <span>{link.label}</span>
                  </div>
                </div>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
