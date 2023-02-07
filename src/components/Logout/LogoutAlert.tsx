import { Alert } from '../Alert/Alert'

export const LogoutAlert = ({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) => {
  return (
    <Alert
      title="ログアウトしますか？"
      message="ユーザー情報は端末に残りません。"
      confirmButtonLabel="ログアウト"
      onConfirm={onConfirm}
      onClose={onClose}
    />
  )
}
