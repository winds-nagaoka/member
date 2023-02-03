import { Layout } from '../../../components/Layout'

export const Notice = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/manager', label: 'お知らせ' },
      ]}
      title="事務局からのお知らせ"
    >
      Notice
    </Layout>
  )
}
