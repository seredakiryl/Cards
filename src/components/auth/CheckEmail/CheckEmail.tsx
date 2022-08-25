import React from 'react'
import s from './CheckEmail.module.css'
import { Title } from '../../profile/Title/Title'
import { Button } from 'antd'

export const CheckEmail = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.checkContainer}>
        <Title text={'Check Email'} />
        <div className={s.logo}></div>
        <div className={s.text}>We’ve sent an Email with instructions to example@mail.com</div>
        <Button type="primary" htmlType="submit" shape="round" className={s.Button}>
          Back to login
        </Button>
      </div>
    </div>
  )
}
