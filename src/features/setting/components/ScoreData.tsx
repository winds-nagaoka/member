import { ContentsBox, Text } from '../../../components/ContentsBox'
import { ContentsButton } from '../../../components/Navigations/ContentsButton'
import { useAuth } from '../../../library/auth'
import { useScoreList } from '../api/getScoreList'
import styles from './ScoreData.module.scss'

export const ScoreData = () => {
  return (
    <>
      <ContentsBox>
        <Text>
          <ScoreCount />
        </Text>
      </ContentsBox>

      <ContentsBox>
        <ContentsButton label="送信" onClick={() => console.log('onClick')} />
      </ContentsBox>
    </>
  )
}

const ScoreCount = () => {
  const scoreListQuery = useScoreList()
  const { user } = useAuth()

  return (
    <div className={styles['setting-status']}>
      <div>
        <div>
          <label>楽譜登録数</label>
          {scoreListQuery.isLoading && <span className={styles.light}>読み込み中...</span>}
          {scoreListQuery.data && <span>{scoreListQuery.data.list.length}</span>}
        </div>
        <div>
          <label>メールアドレス</label>
          {user?.email ? <span>{user.email}</span> : <span className={styles.light}>未設定</span>}
        </div>
      </div>
    </div>
  )
}
