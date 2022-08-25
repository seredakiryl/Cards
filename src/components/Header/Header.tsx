import React from 'react'
import s from './Header.module.css'
import { Avatar } from '../profile/Avatar/Avatar'
import { useAppSelector } from '../../store/store'
import { Button } from 'antd'
// const logo = require('./../../assets/images/logo.png')

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  return (
    <div className={s.wrapper}>
      <div className={s.logo}></div>
      {isLoggedIn ? (
        <div className={s.userBlock}>
          <div className={s.userName}>Name</div>
          <div className={s.userAva}></div>
        </div>
      ) : (
        <Button type="primary" htmlType="submit" shape="round" className={s.Button}>
          Sign in
        </Button>
      )}
    </div>
  )
}
