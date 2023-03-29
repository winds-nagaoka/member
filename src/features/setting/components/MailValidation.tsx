import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { ContentsBox, ContentsLoading, Text } from '../../../components/ContentsBox'
import { useAuth } from '../../../library/auth'
import { MailValidationResponse, useMailValidation } from '../api/getMailValidation'
import { ReactComponent as CheckIcon } from '../../../assets/check.svg'
import { ReactComponent as NonCheckIcon } from '../../../assets/close-circle.svg'

import styles from './MailValidation.module.scss'

export const MailValidation = () => {
  const { key } = useParams()
  const mailValidationQuery = useMailValidation(key ?? '')
  const { user } = useAuth()

  if (mailValidationQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!mailValidationQuery.data) {
    return null
  }

  return (
    <ContentsBox>
      <div className={styles['email-validation']}>
        <Text>
          {user?.email}
          {user?.emailValid ? (
            <div className={clsx(styles.label, styles.ok)}>
              <span>
                <CheckIcon />
                確認済み
              </span>
            </div>
          ) : (
            <Result validationResult={mailValidationQuery.data} />
          )}
        </Text>
      </div>
    </ContentsBox>
  )
}

const Result = ({ validationResult }: { validationResult: MailValidationResponse }) => {
  const { err } = validationResult
  if (err) {
    switch (err.type) {
      case 'DBError':
        return (
          <div className={clsx(styles.label, styles.ng)}>
            <span>
              <NonCheckIcon />
              データベースエラーです
            </span>
          </div>
        )
      case 'notMatchError':
        return (
          <div className={clsx(styles.label, styles.ng)}>
            <span>
              <NonCheckIcon />
              URLが無効です
            </span>
          </div>
        )
      case 'noDataError':
        return (
          <div className={clsx(styles.label, styles.ng)}>
            <span>
              <NonCheckIcon />
              URLが無効です
            </span>
          </div>
        )
      case 'expiredError':
        return (
          <div className={clsx(styles.label, styles.ng)}>
            <span>
              <NonCheckIcon />
              リンクの期限が切れています
            </span>
          </div>
        )
      case 'alreadyValid':
        return (
          <div className={clsx(styles.label, styles.ok)}>
            <span>
              <CheckIcon />
              確認しました
            </span>
          </div>
        )
      default:
        return (
          <div className={clsx(styles.label, styles.ng)}>
            <span>
              <NonCheckIcon />
              エラーが発生しました
            </span>
          </div>
        )
    }
  } else {
    return (
      <div className={clsx(styles.label, styles.ok)}>
        <span>
          <CheckIcon />
          確認済み
        </span>
      </div>
    )
  }
}
