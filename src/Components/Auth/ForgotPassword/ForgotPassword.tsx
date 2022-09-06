import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react'

import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { forgotPasswordTC } from '../../../Store/auth-reducer'
import { useAppDispatch } from '../../../Store/store'
import { Title } from '../../Profile/Title/Title'

import s from './ForgotPassword.module.css'
import { admin, messageStyle } from './ParamsForForgotPassword'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let [email, setEmail] = useState('')

  const [emailDirty, setEmailDirty] = useState(false)
  const [emailError, setEmailError] = useState('Required')

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmailDirty(true)
    }
  }
  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.currentTarget.value)) {
      setEmailError('Invalid email address')
    } else {
      setEmailError('')
    }
  }
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
    navigate('/check-email')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Title text={'Forgot your password?'} />
        <input
          name="email"
          value={email}
          className={s.input}
          placeholder={email}
          // onChange={onchangeHandler}
          onChange={e => emailHandler(e)}
          onKeyPress={onEnterHandler}
          onBlur={e => blurHandler(e)}
        />
        {emailDirty && emailError && <div className={s.errorStyle}>{emailError}</div>}
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
