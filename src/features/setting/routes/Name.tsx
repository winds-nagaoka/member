import { Layout } from '../../../components/Layout'

export const Name = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/name', label: '名前の変更' },
      ]}
      title="名前の変更"
      subTitle="名前を変える意味はあんまりないです"
    >
      Name
    </Layout>
  )
}
