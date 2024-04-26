import { ContentsBox, ContentsLoading, Text } from '../../../components/ContentsBox'
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
        {windsTermsQuery.isLoading && <ContentsLoading />}
        {windsTermsQuery.data && (
          <Text>
            <div className={styles.monospaced}>
              {windsTermsQuery.data.split('\n').map((line, index) => (
                <TermsLine key={index}>{line}</TermsLine>
              ))}
            </div>
          </Text>
        )}
      </div>
    </ContentsBox>
  )
}

const TermsLine = ({ children }: { children: string }) => {
  if (children === '') {
    return <div>&nbsp;</div>
  }

  if (/^（.*）/.test(children)) {
    return (
      <div className={styles['sub-title']}>
        <h3>{children}</h3>
      </div>
    )
  }

  if (/^付則$/.test(children.trim())) {
    return <div className={styles.additional}>{children}</div>
  }

  return <div>{children}</div>
}
