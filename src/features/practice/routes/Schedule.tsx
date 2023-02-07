import { Layout } from '../../../components/Layout'
import { ScheduleList } from '../components/ScheduleList'
import { BackToHome } from '../../../components/Navigations'

export const Schedule = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/practice', label: '練習について' },
      ]}
      title="練習について"
      subTitle="今後の練習予定です"
    >
      <ScheduleList />
      <BackToHome />
    </Layout>
  )
}
