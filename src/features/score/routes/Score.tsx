import { Layout } from '../../../components/Layout'

export const Score = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/score', label: 'ウィンズスコア' },
      ]}
      title="ウィンズスコア"
      subTitle="ウィンズが所有している楽譜です"
    >
      score
    </Layout>
  )
}
