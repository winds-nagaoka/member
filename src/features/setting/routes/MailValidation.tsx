import { useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { BackLink } from '../../../components/Navigations/BackLink'
import { MailValidation as MailValidationComponent } from '../components/MailValidation'

export const MailValidation = () => {
  const { key } = useParams()
  return (
    <Layout
      breadList={[
        { path: '/', label: 'ホーム' },
        { path: '/setting', label: '設定' },
        { path: `/setting/valid/${key}`, label: 'メールアドレスの確認' },
      ]}
      title="メールアドレスの確認"
    >
      <MailValidationComponent />
      <BackLink path="/setting" />
      <BackToHome />
    </Layout>
  )
}
