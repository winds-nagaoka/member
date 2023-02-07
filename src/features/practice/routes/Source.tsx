import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { SourceList } from '../components/SourceList'

export const Source = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/practice', label: '練習について' },
        { path: '/practice/source', label: '参考音源' },
      ]}
      title="参考音源"
      subTitle="直近の演奏会の参考音源です"
    >
      <SourceList />
      <BackToHome />
    </Layout>
  )
}
