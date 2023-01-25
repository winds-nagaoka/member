import { Layout } from '../../../components/Layout'

export const Session = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/session', label: 'セッションの管理' },
      ]}
      title="セッションの管理"
      subTitle="過去にログインした端末の管理ができます"
    >
      Session
    </Layout>
  )
}
