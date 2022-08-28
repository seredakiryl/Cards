import React from 'react'
import s from './CheckEmail.module.css'
import { Title } from '../../Profile/Title/Title'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate('/')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.checkContainer}>
        <Title text={'Check Email'} />
        <div className={s.logo}></div>
        <div className={s.text}>We’ve sent an Email with instructions to example@mail.com</div>
        <Button
          onClick={navigateToLogin}
          type="primary"
          htmlType="submit"
          shape="round"
          className={s.Button}
        >
          Back to login
        </Button>
      </div>
    </div>
  )
}
