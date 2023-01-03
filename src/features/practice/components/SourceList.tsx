import clsx from 'clsx'
import { ContentsBox, ContentsLoading, Text, TitleFrame } from '../../../components/ContentsBox'
import { useStyle } from '../../../utilities/useStyle'
import { useSourceList } from '../api/getSourceList'
import { ReactComponent as PlayIcon } from '../../../assets/play-circle.svg'
import { ReactComponent as NoPlayIcon } from '../../../assets/close-circle.svg'
import styles from './SourceList.module.scss'
import { useAudioStore } from '../../../stores/audio'

export const SourceList = () => {
  const pc = useStyle()
  const sourceListQuery = useSourceList()
  const { setTrack } = useAudioStore()
  if (sourceListQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!sourceListQuery.data) {
    return null
  }
  const onClickMusicItem = (playTrack: number, playId: string) => setTrack(playTrack, playId, 'source')
  return (
    <>
      {sourceListQuery.data.list.length === 0 && (
        <ContentsBox>
          <TitleFrame>
            <Text>みつかりませんでした</Text>
          </TitleFrame>
        </ContentsBox>
      )}
      {sourceListQuery.data.list.map((sourceItem) => {
        const { data } = sourceItem.detail
        return (
          <ContentsBox key={sourceItem.id}>
            <div className={styles['source-list']}>
              <TitleFrame title={sourceItem.detail.title}>
                <ol>
                  {sourceItem.detail.contents.map((list, index) => {
                    const musicList = list.music.map((ml, track) => {
                      const composer =
                        'composer' in data[ml] ? (
                          'arranger' in data[ml] ? (
                            <span className={styles.composer}>
                              {data[ml].composer}
                              {data[ml].composer?.match(/民謡/) ? '' : '作曲'}
                              <span>/</span>
                              {data[ml].arranger}編曲
                            </span>
                          ) : (
                            <span className={styles.composer}>{data[ml].composer}</span>
                          )
                        ) : 'arranger' in data[ml] ? (
                          <span className={styles.composer}>{data[ml].arranger}編曲</span>
                        ) : (
                          ''
                        )
                      const additional =
                        'add' in data[ml] ? (
                          <ol>
                            {data[ml].addtitle?.map((mv, k) => (
                              <li key={'a' + sourceItem.id + k}>{mv}</li>
                            ))}
                          </ol>
                        ) : (
                          ''
                        )
                      const movement =
                        'movement' in data[ml] ? (
                          <ol>
                            {data[ml].movement?.map((mv, k) => (
                              <li key={'a' + sourceItem.id + k}>{mv}</li>
                            ))}
                          </ol>
                        ) : (
                          ''
                        )
                      const clickHandler =
                        'audio' in data[ml] ? () => onClickMusicItem(data[ml].audio!, sourceItem.id) : () => {}
                      const hasAudio = 'audio' in data[ml] ? <PlayIcon /> : <NoPlayIcon />
                      return (
                        <li
                          key={`ml-${sourceItem.id}-${index}-${track}`}
                          className={clsx(styles.track, { [styles['has-audio']]: 'audio' in data[ml] })}
                          onClick={clickHandler}
                        >
                          <div>{hasAudio}</div>
                          <div>
                            <span>{data[ml].title}</span>
                            {composer}
                            {additional}
                            {movement}
                          </div>
                        </li>
                      )
                    })
                    return (
                      <li key={`${sourceItem.id}-${index}`}>
                        <label
                          className={clsx(
                            styles['sticky-label'],
                            { [styles.other]: !list.label.match(/第[0-9]部/) },
                            styles[pc]
                          )}
                        >
                          {list.label}
                        </label>
                        <ol>{musicList}</ol>
                      </li>
                    )
                  })}
                </ol>
              </TitleFrame>
            </div>
          </ContentsBox>
        )
      })}
    </>
  )
}
