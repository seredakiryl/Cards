import { useState } from 'react'

import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../Store/store'
import { Avatar } from '../Profile/Avatar/Avatar'

import s from './Header.module.css'
import { HeaderProfile } from './HeaderProfile/HeaderProfile'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const name = useAppSelector(state => state.auth.name)
  let [isHidden, setIsHidden] = useState(true)
  const onShowAvaHandler = () => {
    setIsHidden(!isHidden)
  }
  const navigate = useNavigate()
  const navigateToRegistration = () => {
    navigate('/')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.logo}></div>
      {isLoggedIn ? (
        <div className={s.userBlock} onClick={onShowAvaHandler}>
          <div className={s.userName}>{name}</div>
          <Avatar className={s.userAva} />
        </div>
      ) : (
        <Button
          onClick={navigateToRegistration}
          type="primary"
          htmlType="submit"
          shape="round"
          className={s.Button}
        >
          Sign in
        </Button>
      )}
      {isHidden ? null : <HeaderProfile onHidden={onShowAvaHandler} />}
    </div>
  )
}
