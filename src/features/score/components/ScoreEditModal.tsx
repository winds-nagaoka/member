import { useState } from 'react'
import clsx from 'clsx'
import { EditMode, useScoreEditModalStore } from '../../../stores/scoreEditModal'
import { useStyle } from '../../../utilities/useStyle'
import styles from './ScoreEditModal.module.scss'
import { ContentsBox, TitleFrame } from '../../../components/ContentsBox'
import { useMediaStore } from '../../../stores/media'
import { Input } from './Input'
import { BoxItem } from '../../../types'

const initialState = {
  number: '',
  titleJa: '',
  titleEn: '',
  composer: [''],
  arranger: [''],
  publisher: '',
  genre: '',
  scoreType: '0',
  copyMemo: '',
  scoreStatus: '0',
  scoreLack: '0',
  lackList: [''],
  lendLocate: '',
  scoreBased: '0',
  label: '',
  boxLabel: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  _id: '',
}

type InputType = typeof initialState

type ArraysKey = 'composer' | 'arranger' | 'lackList'

function assertArraysKey(key: keyof typeof initialState): asserts key is ArraysKey {
  if (['composer', 'arranger', 'lackList'].includes(key)) {
    return undefined
  }
  throw Error('Not a arrays key')
}

const useScoreEdit = () => {
  const [input, setInput] = useState(initialState)
  const setValue = (value: string, key: keyof typeof initialState, arrayIndex?: number) => {
    if (['composer', 'arranger', 'lackList'].includes(key)) {
      assertArraysKey(key)
      const newArray = input[key].map((item, index) => (index === arrayIndex ? value : item))
      setInput((state) => ({ ...state, [key]: newArray }))
    } else {
      setInput((state) => ({ ...state, [key]: value }))
    }
  }

  const addBlank = (key: ArraysKey) => {
    setInput((state) => ({ ...state, [key]: [...input[key], ''] }))
  }

  return { input, setValue, addBlank }
}

export const ScoreEditModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, scoreItem, boxList, editMode } = useScoreEditModalStore()
  const { displayPlayer } = useMediaStore()

  const { input, setValue, addBlank } = useScoreEdit()

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
            <Base input={input} setValue={setValue} addBlank={addBlank} />

            <Status input={input} setValue={setValue} addBlank={addBlank} />

            <Info editMode={editMode} boxList={boxList} input={input} setValue={setValue} />

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

const Base = ({
  input,
  setValue,
  addBlank,
}: {
  input: InputType
  setValue: (value: string, key: keyof typeof initialState, arrayIndex?: number) => void
  addBlank: (key: ArraysKey) => void
}) => {
  const pc = useStyle()
  return (
    <ContentsBox>
      <div className={clsx(styles['score-edit'], styles[pc])}>
        <TitleFrame title="基本情報">
          <div className={styles.list}>
            <Input
              label="タイトル(日本語)"
              value={input.titleJa}
              inputClassName={styles['title-ja']}
              onChange={(e) => setValue(e.target.value, 'titleJa')}
            />
            <Input
              label="タイトル(英語)"
              value={input.titleEn}
              inputClassName={styles['title-en']}
              onChange={(e) => setValue(e.target.value, 'titleEn')}
            />
            {input.composer.map((composer, index) => {
              return (
                <Input
                  key={`composer-${index}`}
                  label={'作曲者' + (index + 1)}
                  value={composer}
                  inputClassName={styles.composer}
                  multi={true}
                  onChange={(e) => setValue(e.target.value, 'composer', index)}
                />
              )
            })}
            <div className={styles['add-data']} onClick={() => addBlank('composer')}>
              <i className="fas fa-plus-circle"></i>作曲者を追加
            </div>
            {input.arranger.map((arranger, index) => {
              return (
                <Input
                  key={`arranger-${index}`}
                  label={'編曲者' + (index + 1)}
                  value={arranger}
                  inputClassName={styles.arranger}
                  multi={true}
                  onChange={(e) => setValue(e.target.value, 'arranger', index)}
                />
              )
            })}
            <div className={styles['add-data']} onClick={() => addBlank('arranger')}>
              <i className="fas fa-plus-circle"></i>編曲者を追加
            </div>
            <Input
              label="出版社"
              value={input.publisher}
              inputClassName={styles.publisher}
              onChange={(e) => setValue(e.target.value, 'publisher')}
            />
            <Input
              label="ジャンル"
              value={input.genre}
              inputClassName={styles.genre}
              onChange={(e) => setValue(e.target.value, 'genre')}
            />
          </div>
        </TitleFrame>
      </div>
    </ContentsBox>
  )
}

const Status = ({
  input,
  setValue,
  addBlank,
}: {
  input: InputType
  setValue: (value: string, key: keyof typeof initialState, arrayIndex?: number) => void
  addBlank: (key: ArraysKey) => void
}) => {
  const pc = useStyle()
  return (
    <ContentsBox>
      <div className={clsx(styles['score-edit'], styles[pc])}>
        <TitleFrame title="楽譜の状態">
          <div className={styles.list}>
            <div className={styles.input}>
              <label>種類</label>
              <div className={styles['radio-input']}>
                <input
                  type="radio"
                  name="scoreType"
                  id="scoreTypeTrue"
                  value={1}
                  checked={input.scoreType === '1'}
                  onChange={(e) => setValue(e.target.value, 'scoreType')}
                />
                <label htmlFor="scoreTypeTrue">
                  <span>コピー譜</span>
                </label>
                <input
                  type="radio"
                  name="scoreType"
                  id="scoreTypeFalse"
                  value={0}
                  checked={input.scoreType === '0'}
                  onChange={(e) => setValue(e.target.value, 'scoreType')}
                />
                <label htmlFor="scoreTypeFalse">
                  <span>原譜</span>
                </label>
              </div>
            </div>
            {input.scoreType === '1' && (
              <Input
                label="コピーメモ"
                value={input.copyMemo}
                inputClassName={styles['copied-from']}
                onChange={(e) => setValue(e.target.value, 'copyMemo')}
              />
            )}
            <div className={styles.input}>
              <label>欠譜</label>
              <div className={styles['radio-input']}>
                <input
                  type="radio"
                  name="scoreLack"
                  id="scoreLackTrue"
                  value={1}
                  checked={input.scoreLack === '1'}
                  onChange={(e) => setValue(e.target.value, 'scoreLack')}
                />
                <label htmlFor="scoreLackTrue">
                  <span>あり</span>
                </label>
                <input
                  type="radio"
                  name="scoreLack"
                  id="scoreLackUnconfirmed"
                  value={2}
                  checked={input.scoreLack === '2'}
                  onChange={(e) => setValue(e.target.value, 'scoreLack')}
                />
                <label htmlFor="scoreLackUnconfirmed">
                  <span>未確認</span>
                </label>
                <input
                  type="radio"
                  name="scoreLack"
                  id="scoreLackFalse"
                  value={0}
                  checked={input.scoreLack === '0'}
                  onChange={(e) => setValue(e.target.value, 'scoreLack')}
                />
                <label htmlFor="scoreLackFalse">
                  <span>なし</span>
                </label>
              </div>
            </div>
            {input.scoreLack === '1' && (
              <div>
                {input.lackList.map((lack, index) => (
                  <Input
                    key={`lack-${index}`}
                    label={'欠譜' + (index + 1)}
                    value={lack}
                    inputClassName={styles['lack-list']}
                    multi={true}
                    onChange={(e) => setValue(e.target.value, 'lackList', index)}
                  />
                ))}
                <div className={styles['add-data']} onClick={() => addBlank('lackList')}>
                  <i className="fas fa-plus-circle"></i>欠譜情報を追加
                </div>
              </div>
            )}
            <div className={styles.input}>
              <label>原譜処理</label>
              <div className={styles['radio-input']}>
                <input
                  type="radio"
                  name="scoreBased"
                  id="scoreBasedTrue"
                  value={1}
                  checked={input.scoreBased === '1'}
                  onChange={(e) => setValue(e.target.value, 'scoreBased')}
                />
                <label htmlFor="scoreBasedTrue">
                  <span>未処理</span>
                </label>
                <input
                  type="radio"
                  name="scoreBased"
                  id="scoreBasedFalse"
                  value={0}
                  checked={input.scoreBased === '0'}
                  onChange={(e) => setValue(e.target.value, 'scoreBased')}
                />
                <label htmlFor="scoreBasedFalse">
                  <span>処理済</span>
                </label>
              </div>
            </div>
          </div>
        </TitleFrame>
      </div>
    </ContentsBox>
  )
}

const Info = ({
  editMode,
  boxList,
  input,
  setValue,
}: {
  editMode: EditMode | null
  boxList: BoxItem[]
  input: InputType
  setValue: (value: string, key: keyof typeof initialState, arrayIndex?: number) => void
}) => {
  const pc = useStyle()
  return (
    <ContentsBox>
      <div className={clsx(styles['score-edit'], styles[pc])}>
        <TitleFrame title="保管情報">
          <div className={styles.list}>
            <div className={styles.input}>
              <label>保管状況</label>
              <div className={styles['radio-input']}>
                <input
                  type="radio"
                  name="scoreStatus"
                  id="scoreStatusLend"
                  value={2}
                  checked={input.scoreStatus === '2'}
                  onChange={(e) => setValue(e.target.value, 'scoreStatus')}
                />
                <label htmlFor="scoreStatusLend" className="highlight-high">
                  <span>貸出中</span>
                </label>
                <input
                  type="radio"
                  name="scoreStatus"
                  id="scoreStatusUsing"
                  value={1}
                  checked={input.scoreStatus === '1'}
                  onChange={(e) => setValue(e.target.value, 'scoreStatus')}
                />
                <label htmlFor="scoreStatusUsing" className="highlight-low">
                  <span>使用中</span>
                </label>
                <input
                  type="radio"
                  name="scoreStatus"
                  id="scoreStatusStrage"
                  value={0}
                  checked={input.scoreStatus === '0'}
                  onChange={(e) => setValue(e.target.value, 'scoreStatus')}
                />
                <label htmlFor="scoreStatusStrage">
                  <span>保管</span>
                </label>
                {editMode !== 'new' && (
                  <>
                    <input
                      type="radio"
                      name="scoreStatus"
                      id="scoreStatusRemove"
                      value={-1}
                      checked={input.scoreStatus === '-1'}
                      onChange={(e) => setValue(e.target.value, 'scoreStatus')}
                    />
                    <label htmlFor="scoreStatusRemove" className="highlight-high">
                      <span>削除</span>
                    </label>
                  </>
                )}
              </div>
            </div>
            {input.scoreStatus === '2' && (
              <Input
                label="貸出先"
                value={input.lendLocate}
                inputClassName={styles.lend}
                onChange={(e) => setValue(e.target.value, 'lendLocate')}
              />
            )}
            <div
              className={styles.input}
              // onClick={() => this.reloadNumberLabel()}
            >
              <label>楽譜管理番号</label>
              <span className={styles['score-number']}>{input.label}</span>
            </div>
            <div className={styles.input}>
              <label>楽譜保管箱</label>
              <div>
                <select value={input.boxLabel} onChange={(e) => setValue(e.target.value, 'boxLabel')}>
                  {boxList.map((box) => (
                    <option key={box._id} value={box.label}>
                      {box.label} - {box.locate === false ? '未設定' : box.locate}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </TitleFrame>
      </div>
    </ContentsBox>
  )
}
