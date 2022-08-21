import React from 'react'
import s from './Header.module.css'
const logo = require('./../../assets/images/logo.png')

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={s.userBlock}>
        <div className={s.userName}>Name</div>
        <div className={s.userAva}></div>
      </div>
    </div>
  )
}
