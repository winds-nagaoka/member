import { ContentsBox } from '../../../components/ContentsBox'
import { ReactComponent as Logo } from '../../../assets/hr.svg'

import styles from './TermsDetail.module.scss'
import { useStyle } from '../../../utilities/useStyle'
import clsx from 'clsx'
import { useWindsTerms } from '../api/getWindsTerms'

export const TermsDetail = () => {
  const pc = useStyle()

  const windsTermsQuery = useWindsTerms()

  return (
    <ContentsBox>
      <div className={clsx(styles.terms, styles[pc])}>
        <div className={styles.title}>
          <div>
            <Logo />
          </div>
          <div>
            <div className={styles['terms-title']}>
              <span>ザ・ウィンド・アンサンブル会員規約</span>
            </div>
          </div>
        </div>
        {windsTermsQuery.isLoading && <>読み込み中</>}
        {windsTermsQuery.data?.split('\n').map((line,index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </ContentsBox>
  )
}
