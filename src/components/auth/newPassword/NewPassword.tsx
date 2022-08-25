import { useParams } from 'react-router-dom'
import { authAPI } from '../../../api/auth-api'

export const NewPassword = () => {
  const param = useParams()

  const model = {
    password: '250995erhfbyf',
    resetPasswordToken: param.token,
  }
  const send = () => {
    authAPI
      .newPassword(model)
      .then(() => console.log('okey'))
      .catch((res) => console.log(res))
  }
  return (
    <>
      <button onClick={send}>dsad</button>
    </>
  )
}
