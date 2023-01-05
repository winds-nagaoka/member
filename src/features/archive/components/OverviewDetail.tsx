import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { ConcertItem, useConcertList } from '../api/getConcertList'
import { ReactComponent as PlayIcon } from '../../../assets/play-circle.svg'
import { ReactComponent as NoPlayIcon } from '../../../assets/close-circle.svg'
import { useStyle } from '../../../utilities/useStyle'
import type { ConcertPlace, ConcertTime, Conductor, Guest, ConcertContent, ConcertMusic } from '../../../types'
import styles from './OverviewDetail.module.scss'
import { useAudioStore } from '../../../stores/audio'

export const OverviewDetail = () => {
  const { concertId } = useParams()
  const concertListQuery = useConcertList()

  if (concertListQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!concertListQuery.data) {
    return null
  }

  const concertItem = concertListQuery.data.list.find((item) => item.id === concertId) || null
  if (!concertItem) {
    return null
  }

  return (
    <ContentsBox>
      <Overview concertItem={concertItem} />
    </ContentsBox>
  )
}

const Overview = ({ concertItem }: { concertItem: ConcertItem }) => {
  const pc = useStyle()
  const { detail } = concertItem
  return (
    <div className={styles['archive-overview']}>
      <div className={styles.article}>
        <div className={styles['concert-detail']}>
          <Poster poster={detail.poster || null} />
          <div className={styles['overview-detail']}>
            <div>
              <label className={clsx(styles['sticky-label'], styles[pc])}>概要</label>
              <ShowDate time={detail.time} />
              <ShowPlace places={detail.place || null} />
              <ShowConductor conductors={detail.conductor || null} />
              {detail.type === 'main' && <ShowGuest guests={detail.guest || null} />}
            </div>
            <ol className={styles['music-list']}>
              <ShowMusic concertId={concertItem.id} contents={detail.contents} musicList={detail.data} />
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

const Label = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div>
      <span>{label}</span>
      <span>{children}</span>
    </div>
  )
}

const Poster = ({ poster }: { poster: string | null }) => {
  return (
    <div className={styles.poster}>
      {poster && <img src={poster} alt="poster" />}
      {!poster && (
        <div className={styles['no-poster']}>
          <div>
            <span>NO IMAGE</span>
          </div>
        </div>
      )}
    </div>
  )
}

const ShowDate = ({ time }: { time: ConcertTime }) => {
  if (time.time && time.label) {
    return (
      <Label label="日時">
        <div>
          <div>{time.date}</div>
          <div>{time.time + time.label}</div>
        </div>
      </Label>
    )
  }
  return (
    <Label label="開催日">
      <div>{time.date}</div>
    </Label>
  )
}

const ShowPlace = ({ places }: { places: ConcertPlace[] | null }) => {
  if (!places) {
    return null
  }
  return (
    <Label label="会場">
      {places.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Label>
  )
}

const ShowConductor = ({ conductors }: { conductors: Conductor[] | null }) => {
  if (!conductors) {
    return null
  }
  return <Label label="指揮">{conductors.map((conductor) => conductor.name).join('・')}</Label>
}

const ShowGuest = ({ guests }: { guests: Guest[] | null }) => {
  if (!guests) {
    return null
  }
  return <Label label="客演">{guests.map((guest) => `${guest.name}(${guest.instrument})`)}</Label>
}

const ShowMusic = ({
  concertId,
  contents,
  musicList,
}: {
  concertId: string
  contents: ConcertContent[]
  musicList: ConcertMusic[]
}) => {
  const { setTrack } = useAudioStore()
  return (
    <>
      {contents.map((contentItem) => {
        return (
          <li key={'l' + contentItem.label}>
            <label className={clsx(styles['sticky-label'], { [styles.other]: !contentItem.label.match(/第[0-9]部/) })}>
              {contentItem.label}
            </label>
            <ol>
              {contentItem.music.map((track, index) => {
                const music = musicList[track]
                const onClickHandler =
                  'audio' in music
                    ? () => music.audio !== undefined && setTrack(music.audio, concertId, 'archive')
                    : () => {}
                return (
                  <li
                    key={music.title + index}
                    className={clsx(styles.track, { [styles['has-audio']]: 'audio' in music })}
                    onClick={onClickHandler}
                  >
                    <div>{'audio' in music ? <PlayIcon /> : <NoPlayIcon />}</div>
                    <div>
                      <span>{music.title}</span>
                      {music.composer ? (
                        music.arranger ? (
                          <span className={styles.composer}>
                            {music.composer}
                            {music.composer.match(/民謡/) ? '' : '作曲'}
                            <span>/</span>
                            {music.arranger}編曲
                          </span>
                        ) : (
                          <span className={styles.composer}>{music.composer}</span>
                        )
                      ) : (
                        music.arranger && <span className={styles.composer}>{music.arranger}編曲</span>
                      )}
                      {music.add && (
                        <ol>
                          {music.add.map((additional) => (
                            <li key={additional}>{additional}</li>
                          ))}
                        </ol>
                      )}
                      {music.movement && (
                        <ol>
                          {music.movement.map((mov) => (
                            <li key={mov}>{mov}</li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </li>
        )
      })}
    </>
  )
}
