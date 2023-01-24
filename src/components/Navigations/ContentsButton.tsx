import { ReactNode } from 'react'
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
