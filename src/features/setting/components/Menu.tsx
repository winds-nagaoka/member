import clsx from 'clsx'
import { ContentsBox } from '../../../components/ContentsBox'
import { Text } from '../../../components/ContentsBox'
import { useAuth } from '../../../library/auth'
import { getToken } from '../../../utilities/session'
import { useStyle } from '../../../utilities/useStyle'
import { ReactComponent as SecureIcon } from '../../../assets/lock.svg'
import { ReactComponent as CheckIcon } from '../../../assets/check.svg'
import { ReactComponent as NonCheckIcon } from '../../../assets/close-circle.svg'
import styles from './Menu.module.scss'
import { ContentsButton } from '../../../components/Navigations/ContentsButton'
import { useMediaStore } from '../../../stores/media'
import { ContentsLinks } from '../../../components/Navigations'

export const Menu = () => {
  return (
    <>
      <Status />

      <RequestEmailValid />

      <PlayerClose />

      <AccountSettingList />

      <ScoreSettingList />

      <AboutAppList />
    </>
  )
}

const Status = () => {
  const pc = useStyle()
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <ContentsBox>
      <div className={clsx(styles['setting-status'], styles[pc])}>
        <div>
          <Text>
            <div>
              <label>
                WindsID&nbsp;
                {user.hash && getToken() ? (
                  <span className={styles.secure}>
                    <SecureIcon />
                  </span>
                ) : (
                  <span className={styles['non-secure']}>
                    <SecureIcon />
                  </span>
                )}
              </label>
              <span className={styles.light}>{user.userid}</span>
            </div>
            {/* <div><label>登録日</label><span>{this.props.user.createdAt}</span></div> */}
            <div>
              <label>名前</label>
              <span>{user.name}</span>
              {user.admin && (
                <div className={styles.label}>
                  <span>管理者</span>
                </div>
              )}
              {user.scoreAdmin && (
                <div className={styles.label}>
                  <span>楽譜管理者</span>
                </div>
              )}
            </div>
            <div>
              <label>メール</label>
              <span>{user.email ? <span>{user.email}</span> : <span className={styles.light}>未設定</span>}</span>
              {user.email && user.emailValid ? (
                <div className={clsx(styles.label, styles.ok)}>
                  <span>
                    <CheckIcon />
                    確認済み
                  </span>
                </div>
              ) : (
                <div className={clsx(styles.label, styles.ng)}>
                  <span>
                    <NonCheckIcon />
                    未確認
                  </span>
                </div>
              )}
            </div>
          </Text>
        </div>
      </div>
    </ContentsBox>
  )
}

const RequestEmailValid = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  if (!(user.email && !user.emailValid)) {
    return null
  }

  return <ContentsButton onClick={() => console.log('requestEmail')} label="確認メールの再送" />
}

const PlayerClose = () => {
  const { displayPlayer, toggleDisplayPlayer } = useMediaStore()

  if (!displayPlayer) {
    return null
  }

  // 再生停止処理が必要
  return <ContentsButton onClick={() => toggleDisplayPlayer(false)} label="プレイヤーを閉じる" />
}

const AccountSettingList = () => {
  const pc = useStyle()

  return (
    <>
      <div className={clsx(styles['box-label'], styles[pc])}>アカウントの設定</div>
      <ContentsBox withLabel={true}>
        <ContentsLinks
          list={[
            { path: 'name', label: '名前' },
            { path: 'email', label: 'メールアドレス' },
            { path: 'password', label: 'パスワード' },
            { path: 'session', label: 'セッションの管理' },
            { path: 'admin', label: '管理者設定' },
            { path: 'delete', label: 'アカウントの削除' },
          ]}
        />
      </ContentsBox>
    </>
  )
}

const ScoreSettingList = () => {
  const pc = useStyle()

  return (
    <>
      <div className={clsx(styles['box-label'], styles[pc])}>ウィンズスコア</div>
      <ContentsBox withLabel={true}>
        <ContentsLinks
          list={[
            { path: 'score/mail', label: 'CSV出力' },
            { path: 'score/admin', label: '管理者設定' },
          ]}
        />
      </ContentsBox>
    </>
  )
}

const AboutAppList = () => {
  const pc = useStyle()

  return (
    <>
      <div className={clsx(styles['box-label'], styles[pc])}>情報</div>
      <ContentsBox withLabel={true}>
        <ContentsLinks
          list={[
            { path: 'terms', label: 'ウィンズ会員規約' },
            { path: 'about', label: 'このアプリについて' },
            // { path: 'tutorial', label: 'チュートリアルを開く' },
            { path: 'license', label: 'ライセンス情報' },
          ]}
        />
      </ContentsBox>
    </>
  )
}
