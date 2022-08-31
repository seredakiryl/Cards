import React from 'react'

import { useNavigate } from 'react-router-dom'

import { logOutTC } from '../../../Store/auth-reducer'
import { useAppDispatch } from '../../../Store/store'

import s from './HeaderProfile.module.css'

type HeaderProfileType = {
  onHidden: () => void
}

export const HeaderProfile = (props: HeaderProfileType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    props.onHidden()
    console.log('log out')
    dispatch(logOutTC())
  }
  const toProfileHandler = () => {
    props.onHidden()
    console.log('to profile')
    navigate('/profile')
  }

  return (
    <div className={s.wrapper} onMouseLeave={() => props.onHidden()}>
      <div className={s.block} onClick={toProfileHandler}>
        <span className={s.profile}></span>
        Profile
      </div>
      <div className={s.block} onClick={logOutHandler}>
        <span className={s.logOut}></span>
        Log out
      </div>
    </div>
  )
}
