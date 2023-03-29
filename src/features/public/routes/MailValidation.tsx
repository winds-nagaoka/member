import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

export const MailValidation = () => {
  const navigate = useNavigate()
  const { key } = useParams()
  if (!key) {
    return null
  }
  return (
    <Layout>
      <LoginForm onSuccess={() => navigate(`/setting/valid/${key}`)} />
    </Layout>
  )
}
