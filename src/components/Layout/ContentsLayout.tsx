import { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ReactComponent as RightIcon } from '../../assets/right.svg'
import styles from './ContentsLayout.module.scss'
import { useStyle } from '../../utilities/useStyle'

type BreadItem = {
  path: string
  label: string
}

export const ContentsLayout = ({
  breadList,
  title,
  subTitle,
  children,
}: {
  breadList: BreadItem[]
  title: string
  subTitle?: string
  children: ReactNode
}) => {
  const pc = useStyle()
  return (
    <div className={clsx(styles['contents-layout'], styles[pc])}>
      <div className={clsx(styles['contents-header'], styles[pc])}>
        <div className={styles['bread-navigation']}>
          {breadList.map((breadItem, index, array) => {
            return (
              <Fragment key={index}>
                <Link to={breadItem.path}>{breadItem.label}</Link>
                {array.length - 1 !== index && (
                  <div className={styles.icon}>
                    <RightIcon />
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
        <h2>{title}</h2>
        {subTitle && <p>{subTitle}</p>}
      </div>
      {children}
    </div>
  )
}
