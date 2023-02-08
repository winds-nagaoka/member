import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { BackLink } from '../../../components/Navigations/BackLink'
import { ChangeMail } from '../components/ChangeMail'

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
      <ChangeMail />
      <BackLink path="/setting" />
      <BackToHome />
    </Layout>
  )
}
