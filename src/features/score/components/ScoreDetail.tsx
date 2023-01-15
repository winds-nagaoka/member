import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { BoxItem, ScoreItem } from '../../../types'
import { useStyle } from '../../../utilities/useStyle'
import { useScoreDetail } from '../api/getScoreDetail'
import { TitleFrame } from '../../../components/ContentsBox'

import styles from './ScoreDetail.module.scss'
import { useAuth } from '../../../library/auth'
import { ContentsButton } from '../../../components/Navigations/ContentsButton'
import { ReactComponent as EditIcon } from '../../../assets/edit.svg'
import { useScoreEditModalStore } from '../../../stores/scoreEditModal'

export const ScoreDetail = () => {
  const { scoreId } = useParams()
  const { user } = useAuth()
  const { onOpen } = useScoreEditModalStore()
  const isScoreAdmin = !!user?.scoreAdmin

  const scoreDetailQuery = useScoreDetail(scoreId || '')
  if (scoreDetailQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!scoreDetailQuery.data) {
    return null
  }
  return (
    <>
      <ScoreDetailStatus scoreItem={scoreDetailQuery.data.data} boxList={scoreDetailQuery.data.boxList} />
      {isScoreAdmin && (
        <ContentsButton
          onClick={() => onOpen(scoreDetailQuery.data.data, scoreDetailQuery.data.boxList, 'editStatus')}
          label="状態を変更"
          icon={<EditIcon />}
        />
      )}
      <ContentsDetail scoreItem={scoreDetailQuery.data.data} />
      {isScoreAdmin && (
        <ContentsButton
          onClick={() => onOpen(scoreDetailQuery.data.data, scoreDetailQuery.data.boxList, 'editDetail')}
          label="詳細情報を修正"
          icon={<EditIcon />}
        />
      )}
    </>
  )
}

const ScoreDetailStatus = ({ scoreItem, boxList }: { scoreItem: ScoreItem; boxList: BoxItem[] }) => {
  const pc = useStyle()

  const scoreStatus = () => {
    if (scoreItem.scoreStatus === '2') {
      return <label className={styles['highlight-high']}>貸出中</label>
    } else if (scoreItem.scoreStatus === '1') {
      return <label className={styles['highlight-low']}>使用中</label>
    } else if (scoreItem.scoreStatus === '0') {
      return <label className={styles['highlight-normal']}>保管</label>
    } else {
      return <label className={styles['highlight-high']}>削除</label>
    }
  }

  const boxUse = boxList.find((box) => box.label === scoreItem.boxLabel)

  return (
    <ContentsBox>
      <div className={clsx(styles['score-detail-status'], styles[pc])}>
        <TitleFrame title="楽譜の状態">
          <div className={clsx(styles['score-status-info'], styles[pc])}>
            <div className={styles['score-box']}>
              <label>楽譜保管箱</label>
              <div>{boxUse?.label}</div>
              <div className={styles['box-locate']}>{boxUse?.locate ? boxUse.locate : '未設定'}</div>
            </div>
            <div className={styles['score-number']}>
              <label>楽譜管理番号</label>
              <div>{scoreItem.label}</div>
              <div className={styles['score-status-display']}>{scoreStatus()}</div>
            </div>
          </div>
        </TitleFrame>
      </div>
    </ContentsBox>
  )
}

const ContentsDetail = ({ scoreItem }: { scoreItem: ScoreItem }) => {
  return (
    <ContentsBox>
      <div className={styles['score-detail-detail']}>
        <TitleFrame title="詳細情報">
          <ul className={styles['score-detail-list']}>
            <li>
              <label>タイトル(日本語)</label>
              <p>
                {scoreItem.titleJa ? (
                  <span className={styles['title-ja']}>{scoreItem.titleJa}</span>
                ) : (
                  <span className={styles['no-data']}>No Data</span>
                )}
              </p>
            </li>
            <li>
              <label>タイトル(原語)</label>
              <p>
                {scoreItem.titleEn ? (
                  <span className={styles['title-en']}>{scoreItem.titleEn}</span>
                ) : (
                  <span className={styles['no-data']}>No Data</span>
                )}
              </p>
            </li>
            <li>
              <label>作曲者</label>
              <p>
                {scoreItem.composer.length === 0 || scoreItem.composer.join(', ') === '' ? (
                  <span className={styles['no-data']}>No Data</span>
                ) : (
                  <span>{scoreItem.composer.join(', ')}</span>
                )}
              </p>
            </li>
            <li>
              <label>編曲者</label>
              <p>
                {scoreItem.arranger.length === 0 || scoreItem.arranger.join(', ') === '' ? (
                  <span className={styles['no-data']}>No Data</span>
                ) : (
                  <span>{scoreItem.arranger.join(', ')}</span>
                )}
              </p>
            </li>
            <li>
              <label>出版社</label>
              <p>{scoreItem.publisher}</p>
            </li>
            <li>
              <label>ジャンル</label>
              <p>{scoreItem.genre}</p>
            </li>
            <li>
              <label>譜種</label>
              <p className={styles['score-type']}>{scoreItem.scoreType === '1' ? 'コピー譜' : '原譜'}</p>
            </li>
            <li>
              <label>欠譜</label>
              <p className={styles['score-lack']}>
                {scoreItem.scoreLack === '1' && 'あり'}
                {scoreItem.scoreLack === '2' && '未確認'}
                {scoreItem.scoreLack !== '1' && scoreItem.scoreLack !== '2' && '未確認'}
              </p>
            </li>
            {scoreItem.scoreLack === '1' && (
              <li>
                <label>欠譜リスト</label>
                {scoreItem.lackList.length === 0 && <p className={styles['no-data']}>No Data</p>}
                {scoreItem.lackList.map((each, i) => (
                  <p className={styles['score-lack-list']} key={'score-lack-' + i}>
                    {each}
                  </p>
                ))}
              </li>
            )}
            <li>
              <label>原譜処理</label>
              <p className={styles['score-based']}>{scoreItem.scoreBased === '1' ? '未処理' : '処理済'}</p>
            </li>
          </ul>
        </TitleFrame>
      </div>
    </ContentsBox>
  )
}
