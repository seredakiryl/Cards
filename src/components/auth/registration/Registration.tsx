import React from 'react'
import { Button, Space } from 'antd'
import s from './Regisration.module.css'

export const Registration = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.hederSignUp}>Sign Up</div>
        <div className={s.hederEmail}>Email</div>
        <div>
          <input type="email" className={s.inputEmail} />
        </div>
        <div className={s.hederPassword}>Password</div>
        <div>
          <input type="password" className={s.inputPassword} />
        </div>
        <div className={s.hederConfirmPassword}>Confirm password</div>
        <div>
          <input type="password" className={s.inputConfirmPassword} />
        </div>

        <Button type="primary" shape="round" size={'large'} className={s.buttonSingUp}>
          Sing up
        </Button>

        <Button type="link" className={s.buttonHaveAccaunt}>
          Already have an account?
        </Button>

        <Button type="link" className={s.buttonSingIn}>
          Sign in
        </Button>
      </div>
    </div>
  )
}
