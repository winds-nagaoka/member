import { Layout } from '../../../components/Layout'
import { BackToHome } from '../../../components/Navigations'
import { BackLink } from '../../../components/Navigations/BackLink'
import { ChangeName } from '../components/ChangeName'

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
      <ChangeName />
      <BackLink path="/setting" />
      <BackToHome />
    </Layout>
  )
}
