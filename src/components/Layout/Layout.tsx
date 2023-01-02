import { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useStyle } from '../../utilities/useStyle'
import { Header } from './Header'
import { MenuContents } from './MenuContents'
import { ReactComponent as RightIcon } from '../../assets/right.svg'

import styles from './Layout.module.scss'

type BreadItem = {
  path: string
  label: string
}

export const Layout = ({
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
    <div className={styles.auth}>
      <Header />
      <div className={clsx(styles.contents, styles[pc])}>
        <div className={clsx(styles['contents-inner'], styles[pc])}>
          <div className={clsx({ [styles['flex-frame']]: pc === 'pc' })}>
            <NavigationInline />
            <div className={styles[pc === 'pc' ? 'inline-contents' : 'full-contents']}>
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
            </div>
          </div>
          <footer>
            <small>&copy; The Wind Ensemble</small>
          </footer>
        </div>
      </div>
    </div>
  )
}

const NavigationInline = () => {
  const pc = useStyle()
  if (pc === 'mobile') {
    return null
  }
  return (
    <div className={styles['menu-contents-inline']}>
      <MenuContents />
    </div>
  )
}
