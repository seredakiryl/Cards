import { authAPI } from '../../../api/auth-api'
import s from './ForgotPassword.module.css'
import { Title } from '../../profile/Title/Title'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from 'antd'
import { useAppDispatch } from '../../../store/store'
import { setAppErrorAC } from '../../../store/app-reducer'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  // let forgotPasswordModel = {
  //   email: email,
  //   from: 'test-front-admin <ai73a@yandex.by>',
  //   message: `<div style="background-color: lime; padding: 15px">
  //     password recovery link:
  //     <a href='http://localhost:3000/SetNewPassword/$token$'>
  //     link</a>
  //     </div>`,
  // }
  let [email, setEmail] = useState('Email')
  let from = 'test-front-admin <ai73a@yandex.by>'
  let message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(email)
      onSendPassword()
    }
  }
  const onSendPassword = () => {
    authAPI
      .forgotPassword({ email, from, message })
      .then((res) => {
        console.log(res.data.info)
      })
      .catch((res) => dispatch(setAppErrorAC(res.message)))
  }
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Title text={'Forgot your password?'} />
        <input
          className={s.input}
          placeholder={email}
          onChange={onchangeHandler}
          onKeyPress={onEnterHandler}
        />
        <div className={s.text}>
          Enter your email address and we will send you further instructions{' '}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          className={s.Button}
          onClick={onSendPassword}
        >
          Send Instructions
        </Button>
        <a href="#" className={s.bottomLink}>
          Did you remember your password?
        </a>
        <a href="#" className={s.bottomLogin}>
          Try logging in
        </a>
      </div>
    </div>
  )
}
