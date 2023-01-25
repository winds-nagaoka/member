import { Layout } from '../../../components/Layout'

export const Password = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/password', label: 'パスワードの変更' },
      ]}
      title="パスワードの変更"
      subTitle="定期的に変えるよりは長くて強固なパスワードがよいとされています"
    >
      Password
    </Layout>
  )
}
