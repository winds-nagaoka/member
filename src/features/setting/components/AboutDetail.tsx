import { ContentsBox, Text } from '../../../components/ContentsBox'
import { ReactComponent as Logo } from '../../../assets/hr.svg'
import { VERSION } from '../../../config'
import styles from './AboutDetail.module.scss'

export const AboutDetail = () => {
  return (
    <ContentsBox>
      <div className={styles.about}>
        <div className={styles['app-version']}>
          <div>
            <Logo />
          </div>
          <div>
            <div className={styles['app-title']}>
              <span>会員専用アプリ</span>
            </div>
            <div className={styles['app-version-number']}>
              <span>
                <span>Version</span>
                <span>{VERSION}</span>
              </span>
            </div>
            {/* {update} */}
          </div>
        </div>
        <Text>
          <h2>アカウントについて</h2>
          <p>ひとつのアカウントで同時に複数の端末にログインすることができるようになりました。</p>
          <p>
            アカウント登録の際に記録される情報は、入力いただいた名前、パスワードおよび登録日時のみです。
            パスワードはSHA-512でハッシュ化し保存しています。 これらの情報はアカウントを削除すると全て消去されます。
          </p>
          <h2>楽曲再生時の注意点</h2>
          <p>
            アプリにて閲覧できる音源、写真、映像はウェブ利用にあわせ圧縮および最適化しています。
            高品質でご覧になりたい場合はCDやDVDをご利用ください。
            また、オリジナルのデータが必要な場合はお問い合わせください。
          </p>
          <p>
            再生ごとにサーバーから音源データを取得するため通信量がかかります。
            録音は5分あたり5MBほど、映像は5分あたり20MBほど使用します。 WiFiの使用を推奨します。
          </p>
        </Text>
      </div>
    </ContentsBox>
  )
}
