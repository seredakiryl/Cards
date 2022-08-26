import s from './ForgotPassword.module.css'
import { Title } from '../../profile/Title/Title'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from 'antd'
import { useAppDispatch } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { forgotPasswordTC } from '../../../store/auth-reducer'
import { admin, messageStyle } from './ParamsForForgotPassword'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let [email, setEmail] = useState('Email')

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendPassword()
    }
  }

  const onSendPassword = () => {
    dispatch(forgotPasswordTC(email, admin, messageStyle))
    navigate('/CheckEmail')
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
