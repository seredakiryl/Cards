import { authAPI } from '../../../api/auth-api'
import s from './ForgotPassword.module.css'

export const ForgotPassword = () => {
  const forgotPasswordModel = {
    email: 'seredakiryl@gmail.com',
    from: 'test-front-admin <ai73a@yandex.by>',
    message: `<div style="background-color: lime; padding: 15px">
      password recovery link: 
      <a href='http://localhost:3000/SetNewPassword/$token$'>
      link</a>
      </div>`,
  }

  const send = () => {
    authAPI
      .forgotPassword(forgotPasswordModel)
      .then(() => console.log('sended'))
      .catch((res) => console.log(res))
  }
  return (
    <div className={s.wrapper}>
      <div className={s.loginContainer}>
        <input value={'seredakiryl@gmail.com'} />
        <button onClick={send}>send</button>
      </div>
    </div>
  )
}
