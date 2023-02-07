import { Link } from 'react-router-dom'
import { ReactComponent as LeftIcon } from '../../assets/left.svg'
import { ContentsBox } from '../ContentsBox'
import styles from './BackToHome.module.scss'

export const BackToHome = () => {
  return (
    <ContentsBox>
      <div className={styles['back-to-home']}>
        <div className={styles['back-link']}>
          <ul>
            <li>
              <Link to="/">
                <div className={styles.inner}>
                  <LeftIcon />
                  <span>ホーム</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </ContentsBox>
  )
}
