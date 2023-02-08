import { Link } from 'react-router-dom'
import { ContentsBox } from '../ContentsBox'
import { ReactComponent as LeftIcon } from '../../assets/left.svg'
import styles from './BackLink.module.scss'

export const BackLink = ({ path, label = '戻る' }: { path: string; label?: string }) => {
  return (
    <ContentsBox>
      <div className={styles['back-link']}>
        <ul>
          <li>
            <Link to={path}>
              <div className={styles.inner}>
                <LeftIcon />
                <span>{label}</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </ContentsBox>
  )
}
