import clsx from 'clsx'
import { useScoreEditModalStore } from '../../../stores/scoreEditModal'
import { useStyle } from '../../../utilities/useStyle'
import styles from './ScoreEditModal.module.scss'
import { ContentsBox } from '../../../components/ContentsBox'
import { useMediaStore } from '../../../stores/media'
import type { ScoreItem } from '../../../types'

export const ScoreEditModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, scoreItem, editMode } = useScoreEditModalStore()
  const { displayPlayer } = useMediaStore()
  const editLoading = false
  const updateScoreEdit = () => console.log('updateScoreEdit')

  if (!scoreItem) {
    return null
  }

  return (
    <div className={styles['score-edit-modal']}>
      <div className={clsx(styles['score-edit-modal-contents'], { [styles.open]: isOpen }, styles[pc])}>
        <div className={clsx(styles.header, styles[pc])}>
          <div className={styles.cancel} onClick={onClose}>
            キャンセル
          </div>
          <div className={styles.title}>{editMode === 'new' ? '新しい楽譜を追加' : '楽譜の修正'}</div>
          <div className={styles.save} onClick={updateScoreEdit}>
            {editLoading ? (
              <span>
                &nbsp;<i className="fas fa-spinner fa-pulse"></i>&nbsp;
              </span>
            ) : editMode === 'new' ? (
              '追加'
            ) : (
              '修正'
            )}
          </div>
        </div>

        <div
          className={styles.contents}
          // ref={(i) => {
          //   !this.props.editModalRef ? this.props.setEditModalRef(i) : false
          // }}
        >
          <div className={styles['contents-inner']}>
            <Base scoreItem={scoreItem} />
            {/* {showBase}

            {showStatus}

            {showInfo} */}

            <ContentsBox>
              <div className={clsx(styles['score-edit-send'], styles[pc])}>
                <div onClick={updateScoreEdit} className={styles['send-button']}>
                  {editLoading ? (
                    '読み込み中'
                  ) : editMode === 'new' ? (
                    <span>
                      <i className="far fa-edit"></i>追加
                    </span>
                  ) : (
                    <span>
                      <i className="far fa-edit"></i>修正
                    </span>
                  )}
                </div>
              </div>
            </ContentsBox>

            {displayPlayer && <div className={styles.gap}></div>}
          </div>
        </div>
      </div>

      <div className={clsx(styles['score-edit-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}

const Base = ({ scoreItem }: { scoreItem: ScoreItem }) => {
  const pc = useStyle()
  const addBlank = (target: string) => console.log('addBlank', target)
  return (
    <ContentsBox>
      <div className={clsx(styles['score-edit'], styles[pc])}>
        <div className={styles['title-frame']}>
          <label>基本情報</label>
          <div className="list">
            {/* <Input
              label="タイトル(日本語)"
              value={score.titleJa}
              target="titleJa"
              inputClass="title-ja"
              onChange={(e) => this.changeValue(e)}
            />
            <Input
              label="タイトル(英語)"
              value={score.titleEn}
              target="titleEn"
              inputClass="title-en"
              onChange={(e) => this.changeValue(e)}
            /> */}
            {/* {composerInput} */}
            <div className="add-data" onClick={() => addBlank('composer')}>
              <i className="fas fa-plus-circle"></i>作曲者を追加
            </div>
            {/* {arrangerInput} */}
            <div className="add-data" onClick={() => addBlank('arranger')}>
              <i className="fas fa-plus-circle"></i>編曲者を追加
            </div>
            {/* <Input
              label="出版社"
              value={score.publisher}
              target="publisher"
              inputClass="publisher"
              onChange={(e) => this.changeValue(e)}
            />
            <Input
              label="ジャンル"
              value={score.genre}
              target="genre"
              inputClass="genre"
              onChange={(e) => this.changeValue(e)}
            /> */}
          </div>
        </div>
      </div>
    </ContentsBox>
  )
}
