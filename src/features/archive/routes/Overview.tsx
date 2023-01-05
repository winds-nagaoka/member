import { useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'
import { useConcertList } from '../api/getConcertList'
import { OverviewDetail } from '../components/OverviewDetail'

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
      <OverviewDetail />
    </Layout>
  )
}
