import { Layout } from '../../../components/Layout'
import { BoxList } from '../components/BoxList'

export const Box = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/score', label: 'ウィンズスコア' },
        { path: '/score/box', label: '楽譜管理箱' },
      ]}
      title="楽譜管理箱"
      subTitle="楽譜管理箱の追加および編集はこちら"
    >
      <BoxList />
    </Layout>
  )
}