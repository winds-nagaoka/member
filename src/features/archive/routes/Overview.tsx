import { useParams } from 'react-router-dom'
import { ContentsLoading } from '../../../components/ContentsBox'
import { Layout } from '../../../components/Layout'
import { useConcertList } from '../api/getConcertList'

export const Overview = () => {
  const { concertId } = useParams()
  const concertListQuery = useConcertList()
  const concertItem = concertListQuery.data?.list.find((item) => item.id === concertId) || null
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/archive', label: 'アーカイブ' },
        {
          path: `/archive/overview/${concertId}`,
          label: concertItem?.detail.title || '',
          isLoading: concertListQuery.isLoading,
        },
      ]}
      title="アーカイブ"
      subTitle="過去のウィンズの活動履歴を確認できます"
    >
      {concertListQuery.isLoading && <ContentsLoading />}
      {!concertListQuery.isLoading && <>Overview</>}
    </Layout>
  )
}
