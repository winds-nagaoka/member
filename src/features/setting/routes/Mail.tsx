import { Layout } from '../../../components/Layout'

export const Mail = () => {
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: '/setting/email', label: 'メールアドレスの設定' },
      ]}
      title="メールアドレスの設定"
      subTitle="連絡先を登録します"
    >
      Mail
    </Layout>
  )
}
