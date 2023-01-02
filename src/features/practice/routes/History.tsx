import { Layout } from '../../../components/Layout'

export const History = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/practice', label: '練習について' },
        { path: '/practice/history', label: '練習の記録' },
      ]}
      title="練習の記録"
      subTitle="練習の録音を掲載しています合奏前から録音しているため適宜早送りしてご利用ください"
    >
      hisotry
    </Layout>
  )
}
