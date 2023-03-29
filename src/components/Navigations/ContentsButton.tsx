import { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './ContentsButton.module.scss'

export const ContentsButton = ({
  label,
  icon,
  isLoading,
  onClick,
}: {
  label: string
  icon?: ReactNode
  isLoading?: boolean
  onClick: () => void
}) => {
  return (
    <div className={styles['contents-button']}>
      <div onClick={onClick}>
        <span>
          {isLoading && 'Loading...'}
          {!isLoading && (
            <>
              {icon}
              {label}
            </>
          )}
        </span>
      </div>
    </div>
  )
}

export const ContentsSubmitButton = ({
  type,
  label,
  isLoading,
  isDisabled,
}: {
  type: 'button' | 'submit' | 'reset'
  label: string
  isLoading?: boolean
  isDisabled?: boolean
}) => {
  return (
    <div className={styles['contents-button']}>
      <button type={type} disabled={isDisabled}>
        <div className={clsx({ [styles.disabled]: isDisabled })}>
          <span>
            {isLoading && 'Loading...'}
            {!isLoading && <>{label}</>}
          </span>
        </div>
      </button>
    </div>
  )
}
