import clsx from 'clsx'
import { confirmAlert } from 'react-confirm-alert'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { useBoxList } from '../api/getBoxList'
import styles from './BoxList.module.scss'
import { ReactComponent as BoxIcon } from '../../../assets/box.svg'
import { ReactComponent as EditIcon } from '../../../assets/edit.svg'
import { useScoreBoxModalStore } from '../../../stores/scoreBoxModal'
import { ContentsButton } from '../../../components/Navigations/ContentsButton'
import { useCreateScoreBox } from '../api/createScoreBox'
import { Alert } from '../../../components/Alert/Alert'

export const BoxList = () => {
  const boxListQuery = useBoxList()
  const { onOpen } = useScoreBoxModalStore()
  const createScoreBoxMutation = useCreateScoreBox()

  if (boxListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!boxListQuery.data) {
    return null
  }

  const addBox = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <Alert
          title="新しい箱を追加します"
          message="古い箱が満杯になったら追加してください"
          onConfirm={() => createScoreBoxMutation.mutate()}
          onClose={onClose}
        />
      ),
    })
  }

  return (
    <>
      <ContentsBox>
        <div className={styles['score-box-list']}>
          {boxListQuery.data.list.map((box) => {
            if (!box.status) {
              return null
            }

            return (
              <div
                key={`score-box-${box._id}`}
                className={clsx(styles['score-box'], { [styles.disabled]: !box.status })}
                onClick={() => onOpen(box)}
              >
                <div className={styles.label}>
                  <span>{box.label}</span>
                </div>
                <BoxIcon />
                <div className={clsx(styles.locate, { [styles.disabled]: !box.locate })}>
                  <span>{box.locate}</span>
                </div>
              </div>
            )
          })}
          {boxListQuery.data.list.length % 3 !== 0 &&
            (3 - (boxListQuery.data.list.length % 3) === 1 ? [''] : ['', '']).map((_, index) => {
              return <div key={`blank-${index}`} className={clsx(styles['score-box'], styles.blank)}></div>
            })}
        </div>
      </ContentsBox>

      <ContentsButton onClick={addBox} icon={<EditIcon />} label="新しい箱を追加" />
    </>
  )
}
