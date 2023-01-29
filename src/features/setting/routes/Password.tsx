import { Layout } from '../../../components/Layout'
import { ChangePassword } from '../components/ChangePassword'

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
      <ChangePassword />
    </Layout>
  )
}
